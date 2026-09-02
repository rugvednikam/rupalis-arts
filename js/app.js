// Rupali's Arts - Main Application Logic
// Direct Instagram DM redirection, catalog filtering, quick view & inquiry bag

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderProducts('all');
  initCategoryFilters();
  initSearch();
  initQuickViewModal();
  initInquiryDrawer();
  renderReviews();
  initAmbianceAudio();
  initCustomOrderForm();
  initFaqAccordion();
});

// ==========================================================================
// NAVBAR & HEADER SCROLL
// ==========================================================================
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu?.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle?.contains(e.target)) {
      navMenu.classList.remove('active');
      const icon = mobileToggle?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });

  // Smooth scroll and auto-close menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        navMenu?.classList.remove('active');
        const icon = mobileToggle?.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });
}

// ==========================================================================
// RENDER PRODUCTS
// ==========================================================================
function renderProducts(category = 'all', searchQuery = '') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  let filtered = PRODUCTS_DATA;

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌸</div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--emerald-900); margin-bottom: 0.5rem;">No products match your search</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try browsing another category or connect with us directly on Instagram for custom designs.</p>
        <button class="btn-primary-insta" onclick="openInstagramDM('Custom Design Inquiry')">
          <i class="fab fa-instagram"></i> Ask on Instagram DM
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" id="img-${product.id}" loading="lazy" />
        <span class="product-badge-tag ${product.badge === 'Festive Luxury' ? 'festive' : product.badge === 'Eco Friendly' ? 'eco' : ''}">
          ✨ ${product.badge}
        </span>
        <div class="quick-action-overlay">
          <button class="card-action-btn" title="Quick View" onclick="openQuickView('${product.id}')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="card-action-btn" title="Add to Inquire Bag" onclick="addToInquiryBag('${product.id}')">
            <i class="fas fa-bookmark"></i>
          </button>
        </div>
      </div>

      <div class="product-body">
        <span class="product-cat-pill">${product.categoryName}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-subtitle">${product.subtitle}</p>

        <ul class="product-features-mini">
          ${product.features.slice(0, 3).map(f => `
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              ${f}
            </li>
          `).join('')}
        </ul>

        <div class="product-dm-banner">
          <div class="dm-tag">
            <i class="fab fa-instagram"></i> Direct DM Order
          </div>
          <div class="custom-tag">✨ 100% Handcrafted</div>
        </div>

        <div class="product-card-actions">
          <button class="btn-buy-insta" onclick="orderProductViaInstagram('${product.id}')">
            <i class="fab fa-instagram"></i> Buy Now (DM)
          </button>
          <button class="btn-quick-view" onclick="openQuickView('${product.id}')">
            Details
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// FILTERS & SEARCH
// ==========================================================================
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      const searchVal = document.getElementById('catalogSearchInput')?.value || '';
      renderProducts(category, searchVal);
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('catalogSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const activeTab = document.querySelector('.tab-btn.active');
    const category = activeTab ? activeTab.dataset.category : 'all';
    renderProducts(category, e.target.value);
  });
}

// ==========================================================================
// INSTAGRAM DM REDIRECTION (PRIMARY ACTION)
// ==========================================================================
window.orderProductViaInstagram = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const text = `Namaste Rupali's Arts! 🙏\n\nI would love to order/inquire about:\n✨ *${product.name}*\n(${product.subtitle})\n\nPlease share the details, customization options, and how to proceed!`;
  
  redirectToInstagramDM(text);
};

window.openInstagramDM = function(customContext = '') {
  let text = "Namaste Rupali's Arts! 🙏\n\nI visited your website and would love to inquire about your handcrafted festive home decor pieces.";
  if (customContext) {
    text = `Namaste Rupali's Arts! 🙏\n\nI'm reaching out regarding: ${customContext}. Please share the details!`;
  }
  redirectToInstagramDM(text);
};

function redirectToInstagramDM(messageText) {
  // Pre-copy message to clipboard so user can easily paste if direct link lands on general inbox
  if (navigator.clipboard && messageText) {
    navigator.clipboard.writeText(messageText).catch(() => {});
  }

  showToast('Opening Instagram DM with @rupalis_arts...');

  const encoded = encodeURIComponent(messageText);
  // Universal Instagram Direct link
  const url = `https://ig.me/m/rupalis_arts?text=${encoded}`;
  
  setTimeout(() => {
    window.open(url, '_blank');
  }, 350);
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickView');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="quick-view-grid">
      <div class="modal-img-wrapper">
        <img id="modalMainImg" src="${product.image}" alt="${product.name}" />
        <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
          ${product.images.map((img, i) => `
            <img src="${img}" style="width: 55px; height: 55px; border-radius: 8px; object-fit: cover; cursor: pointer; border: 2px solid ${i === 0 ? 'var(--gold-400)' : 'transparent'};" onclick="document.getElementById('modalMainImg').src='${img}'" />
          `).join('')}
        </div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span class="product-cat-pill">${product.categoryName}</span>
        <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--emerald-900); margin-bottom: 0.35rem;">${product.name}</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${product.subtitle}</p>

        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem;">
          <div style="color: var(--amber-500);">
            ${'★'.repeat(Math.floor(product.rating))}
          </div>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--emerald-900);">${product.rating}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">(${product.reviewsCount} verified reviews)</span>
        </div>

        <p style="font-size: 0.925rem; color: var(--text-body); margin-bottom: 1.25rem; line-height: 1.6;">${product.description}</p>

        <div style="background: var(--cream-100); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--cream-300);">
          <h4 style="font-size: 0.825rem; font-weight: 700; text-transform: uppercase; color: var(--emerald-900); margin-bottom: 0.5rem;">Specifications</h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 0.35rem; font-size: 0.8rem;">
            ${Object.entries(product.specifications).map(([key, val]) => `
              <div><strong style="color: var(--emerald-900);">${key}:</strong> <span style="color: var(--text-body);">${val}</span></div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: auto;">
          <button class="btn-primary-insta" style="flex: 1;" onclick="orderProductViaInstagram('${product.id}')">
            <i class="fab fa-instagram"></i> Buy Now (Instagram DM)
          </button>
          <button class="btn-secondary-outline" onclick="addToInquiryBag('${product.id}')">
            <i class="fas fa-bookmark"></i> Save
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

// ==========================================================================
// INQUIRY BAG / WISHLIST DRAWER
// ==========================================================================
let inquiryBag = [];

function initInquiryDrawer() {
  const drawer = document.getElementById('inquiryDrawer');
  const openBtn = document.getElementById('btnOpenInquiryDrawer');
  const closeBtn = document.getElementById('btnCloseInquiryDrawer');
  const sendAllBtn = document.getElementById('btnSendAllInquiry');

  openBtn?.addEventListener('click', () => {
    drawer?.classList.add('active');
    renderInquiryDrawerItems();
  });

  closeBtn?.addEventListener('click', () => {
    drawer?.classList.remove('active');
  });

  sendAllBtn?.addEventListener('click', () => {
    if (inquiryBag.length === 0) {
      alert('Your inquiry list is empty. Add products to inquire!');
      return;
    }

    const itemsSummary = inquiryBag.map((item, idx) => `${idx + 1}. ${item.name} (${item.subtitle})`).join('\n');
    const customNotes = document.getElementById('inquiryNotesInput')?.value || '';
    
    let msg = `Namaste Rupali's Arts! 🙏\n\nI would love to inquire about the following handcrafted decor pieces:\n\n${itemsSummary}`;
    if (customNotes.trim() !== '') {
      msg += `\n\n*Customization / Delivery Note:* ${customNotes.trim()}`;
    }
    msg += `\n\nPlease let me know pricing and how to confirm the order!`;

    redirectToInstagramDM(msg);
  });
}

window.addToInquiryBag = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (!inquiryBag.some(item => item.id === productId)) {
    inquiryBag.push(product);
    updateInquiryBadge();
    showToast(`Added "${product.name}" to inquiry list!`);
  } else {
    showToast(`"${product.name}" is already in your inquiry list!`);
  }
};

window.removeFromInquiryBag = function(productId) {
  inquiryBag = inquiryBag.filter(item => item.id !== productId);
  updateInquiryBadge();
  renderInquiryDrawerItems();
};

function updateInquiryBadge() {
  const badges = document.querySelectorAll('.inquiry-badge-count');
  badges.forEach(b => {
    b.textContent = inquiryBag.length;
    b.style.display = inquiryBag.length > 0 ? 'flex' : 'none';
  });
}

function renderInquiryDrawerItems() {
  const container = document.getElementById('inquiryDrawerList');
  if (!container) return;

  if (inquiryBag.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌸</div>
        <p style="font-weight: 600;">Your inquiry list is empty</p>
        <p style="font-size: 0.8rem; margin-top: 0.25rem;">Browse products and click save to bundle your custom order inquiry.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = inquiryBag.map(item => `
    <div class="inquiry-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="inquiry-item-info">
        <h5>${item.name}</h5>
        <p>${item.categoryName}</p>
      </div>
      <button class="btn-remove-item" onclick="removeFromInquiryBag('${item.id}')" title="Remove">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// ==========================================================================
// REVIEWS
// ==========================================================================
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  grid.innerHTML = REVIEWS_DATA.map(r => `
    <div class="review-card">
      <div>
        <div class="review-stars">
          ${'★'.repeat(r.rating)}
        </div>
        <span class="review-product-tag">✨ ${r.product}</span>
        <p class="review-text">"${r.text}"</p>
      </div>
      <div class="reviewer-meta">
        <span class="reviewer-name">${r.author}</span>
        <span class="reviewer-city">📍 ${r.city} • ${r.date}</span>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// CUSTOM ORDER FORM
// ==========================================================================
function initCustomOrderForm() {
  const form = document.getElementById('customOrderForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customName')?.value || '';
    const city = document.getElementById('customCity')?.value || '';
    const details = document.getElementById('customDetails')?.value || '';

    const text = `Namaste Rupali's Arts! 🙏\n\n*Custom Decor Inquiry*\n*Name:* ${name}\n*City:* ${city}\n*Requirements:* ${details}\n\nPlease let me know how to proceed with the custom order!`;
    redirectToInstagramDM(text);
  });
}

// ==========================================================================
// FESTIVE AMBIENT AUDIO SYNTHESIZER
// ==========================================================================
let audioCtx = null;
let isAudioPlaying = false;

function initAmbianceAudio() {
  const btn = document.getElementById('btnAudioAmbiance');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) {
      playGentleChimeChord();
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      btn.style.color = 'var(--gold-400)';
      showToast('✨ Festive ambiance chimes active');
    } else {
      btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      btn.style.color = '';
    }
  });
}

function playGentleChimeChord() {
  if (!audioCtx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major festive chime pentatonic
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.5);
    }, idx * 180);
  });
}

// ==========================================================================
// FAQ ACCORDION (SEO ENHANCEMENT)
// ==========================================================================
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ==========================================================================
// TOAST HELPER
// ==========================================================================
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  existing?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<i class="fas fa-sparkles" style="color: var(--gold-400);"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


