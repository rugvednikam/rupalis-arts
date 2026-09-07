// Rupali's Arts - Handcrafted Festive Home Decor
// Main Application Logic - Direct Instagram DM redirection, catalog filtering, inquiry bag & multi-page navigation

// Global Mobile Sidebar Controls
let lastToggleTimestamp = 0;

window.openMobileSidebar = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const mobileSidebar = document.getElementById('mobileSidebar');
  const mobileBackdrop = document.getElementById('mobileSidebarBackdrop');
  const mobileToggle = document.getElementById('mobileToggle');

  if (mobileSidebar) {
    mobileSidebar.classList.add('open');
  }
  if (mobileBackdrop) {
    mobileBackdrop.classList.add('active');
  }
  document.body.classList.add('mobile-sidebar-locked');
  if (mobileToggle) {
    mobileToggle.setAttribute('aria-expanded', 'true');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-times';
  }
};

window.closeMobileSidebar = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const mobileSidebar = document.getElementById('mobileSidebar');
  const mobileBackdrop = document.getElementById('mobileSidebarBackdrop');
  const mobileToggle = document.getElementById('mobileToggle');

  if (mobileSidebar) {
    mobileSidebar.classList.remove('open');
  }
  if (mobileBackdrop) {
    mobileBackdrop.classList.remove('active');
  }
  document.body.classList.remove('mobile-sidebar-locked');
  if (mobileToggle) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  }
};

window.toggleMobileSidebar = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const now = Date.now();
  if (now - lastToggleTimestamp < 250) return;
  lastToggleTimestamp = now;

  const mobileSidebar = document.getElementById('mobileSidebar');
  if (mobileSidebar && mobileSidebar.classList.contains('open')) {
    window.closeMobileSidebar(e);
  } else {
    window.openMobileSidebar(e);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActivePageNav();
  renderProductsCatalog();
  renderFeaturedProducts();
  initCategoryFilters();
  initSearch();
  initQuickViewModal();
  initInquiryDrawer();
  renderReviews();
  initCustomOrderForm();
  initFaqAccordion();
});

// ==========================================================================
// NAVBAR & MOBILE SLIDE-OUT SIDEBAR DRAWER
// ==========================================================================
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const mobileBackdrop = document.getElementById('mobileSidebarBackdrop');
  const closeSidebarBtn = document.getElementById('closeMobileSidebarBtn');
  const mobileInquiryBtn = document.getElementById('mobileSidebarInquiryBtn');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle button click
  mobileToggle?.addEventListener('click', (e) => {
    window.toggleMobileSidebar(e);
  });

  // Close button & backdrop click
  closeSidebarBtn?.addEventListener('click', (e) => window.closeMobileSidebar(e));
  mobileBackdrop?.addEventListener('click', (e) => window.closeMobileSidebar(e));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileSidebar?.classList.contains('open')) {
      window.closeMobileSidebar();
    }
  });

  // Touch Swipe Gesture: Swipe left to dismiss left-side drawer
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  mobileSidebar?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  mobileSidebar?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);

    if (deltaX < -40 && Math.abs(deltaX) > deltaY) {
      window.closeMobileSidebar();
    }
  }, { passive: true });

  // Sidebar Inquiry Bag Shortcut
  mobileInquiryBtn?.addEventListener('click', () => {
    window.closeMobileSidebar();
    const inquiryDrawer = document.getElementById('inquiryDrawer');
    if (inquiryDrawer) {
      inquiryDrawer.classList.add('active');
      if (typeof renderInquiryDrawerItems === 'function') {
        renderInquiryDrawerItems();
      }
    }
  });

  // Auto-close sidebar if viewport resizes above tablet breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileSidebar?.classList.contains('open')) {
      window.closeMobileSidebar();
    }
  }, { passive: true });
}

// Active Page Nav Highlighting
function initActivePageNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ==========================================================================
// RENDER PRODUCTS (CATALOG & FEATURED)
// ==========================================================================
function createProductCardHTML(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" id="img-${product.id}" loading="lazy" />
        <span class="product-badge-tag ${product.badge === 'Festive Luxury' ? 'festive' : product.badge === 'Eco Friendly' ? 'eco' : ''}">
          ✨ ${product.badge}
        </span>
        <div class="quick-action-overlay">
          <button class="card-action-btn" title="Quick View" onclick="openQuickView('${product.id}')" aria-label="Quick View ${product.name}">
            <i class="fas fa-eye" aria-hidden="true"></i>
          </button>
          <button class="card-action-btn" title="Share Product" onclick="shareProduct('${product.id}')" aria-label="Share ${product.name}">
            <i class="fas fa-share-nodes" aria-hidden="true"></i>
          </button>
          <button class="card-action-btn" title="Save to Inquiry Bag" onclick="addToInquiryBag('${product.id}')" aria-label="Save ${product.name}">
            <i class="fas fa-bookmark" aria-hidden="true"></i>
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
          <div class="custom-tag">100% Handcrafted</div>
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
  `;
}

function renderProductsCatalog(category = 'all', searchQuery = '') {
  const grid = document.getElementById('productsGrid');
  if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

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
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try browsing another category or message us directly on Instagram for custom designs.</p>
        <button class="btn-primary-insta" onclick="openInstagramDM('Custom Design Inquiry')">
          <i class="fab fa-instagram"></i> Ask on Instagram DM
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

  const featured = PRODUCTS_DATA.filter(p => p.featured).slice(0, 4);
  grid.innerHTML = featured.map(product => createProductCardHTML(product)).join('');
}

// ==========================================================================
// FILTERS & SEARCH
// ==========================================================================
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      const searchVal = document.getElementById('catalogSearchInput')?.value || '';
      renderProductsCatalog(category, searchVal);
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('catalogSearchInput');
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const activeTab = document.querySelector('.tab-btn.active');
      const category = activeTab ? activeTab.dataset.category : 'all';
      renderProductsCatalog(category, e.target.value);
    }, 200);
  });
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
let currentQuickViewProduct = null;

function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('closeModalBtn');

  closeBtn?.addEventListener('click', closeQuickView);
  backdrop?.addEventListener('click', closeQuickView);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeQuickView();
    }
  });
}

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('modalBackdrop');

  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductImg').alt = product.name;
  document.getElementById('modalProductCategory').textContent = product.categoryName;
  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductSubtitle').textContent = product.subtitle;
  document.getElementById('modalProductDescription').textContent = product.description;

  const featuresList = document.getElementById('modalProductFeatures');
  featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');

  const specsList = document.getElementById('modalProductSpecs');
  specsList.innerHTML = Object.entries(product.specifications).map(([key, val]) => `
    <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed var(--cream-200); font-size: 0.85rem;">
      <strong style="color: var(--emerald-900);">${key}:</strong>
      <span style="color: var(--text-body);">${val}</span>
    </div>
  `).join('');

  modal?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('modalBackdrop');

  modal?.classList.remove('active');
  backdrop?.classList.remove('active');
  document.body.style.overflow = '';
}

function orderCurrentModalProduct() {
  if (currentQuickViewProduct) {
    orderProductViaInstagram(currentQuickViewProduct.id);
  }
}

// ==========================================================================
// INQUIRY BAG (SAVED PRODUCTS DRAWER)
// ==========================================================================
let inquiryBag = JSON.parse(localStorage.getItem('rupalis_inquiry_bag') || '[]');

function initInquiryDrawer() {
  const drawer = document.getElementById('inquiryDrawer');
  const backdrop = document.getElementById('inquiryBackdrop');
  const openBtn = document.getElementById('btnOpenInquiryDrawer');
  const closeBtn = document.getElementById('btnCloseInquiryDrawer');
  const sendAllBtn = document.getElementById('btnSendAllInquiry');

  openBtn?.addEventListener('click', () => {
    drawer?.classList.add('active');
    backdrop?.classList.add('active');
    renderInquiryDrawerItems();
  });

  closeBtn?.addEventListener('click', () => {
    drawer?.classList.remove('active');
    backdrop?.classList.remove('active');
  });

  backdrop?.addEventListener('click', () => {
    drawer?.classList.remove('active');
    backdrop?.classList.remove('active');
  });

  sendAllBtn?.addEventListener('click', sendAllInquiryBagToInstagram);

  updateInquiryBadgeCount();
}

function addToInquiryBag(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (!inquiryBag.some(item => item.id === productId)) {
    inquiryBag.push(product);
    localStorage.setItem('rupalis_inquiry_bag', JSON.stringify(inquiryBag));
    updateInquiryBadgeCount();
    showToast(`Saved "${product.name}" to Inquiry Bag!`);
  } else {
    showToast(`"${product.name}" is already in your Inquiry Bag.`);
  }
}

function removeFromInquiryBag(productId) {
  inquiryBag = inquiryBag.filter(item => item.id !== productId);
  localStorage.setItem('rupalis_inquiry_bag', JSON.stringify(inquiryBag));
  updateInquiryBadgeCount();
  renderInquiryDrawerItems();
}

function updateInquiryBadgeCount() {
  const counts = document.querySelectorAll('.inquiry-badge-count');
  counts.forEach(count => {
    count.textContent = inquiryBag.length;
    count.style.display = inquiryBag.length > 0 ? 'flex' : 'none';
  });
}

function renderInquiryDrawerItems() {
  const list = document.getElementById('inquiryDrawerList');
  if (!list) return;

  if (inquiryBag.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🌸</div>
        <p style="font-weight: 600; color: var(--emerald-900);">Your Inquiry Bag is Empty</p>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Bookmark pieces as you explore the handcrafted collection.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = inquiryBag.map(item => `
    <div class="inquiry-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="inquiry-item-info">
        <h4>${item.name}</h4>
        <p>${item.subtitle}</p>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.4rem;">
          <a href="javascript:void(0)" onclick="orderProductViaInstagram('${item.id}')" style="font-size: 0.75rem; color: var(--emerald-700); font-weight: 700;">
            <i class="fab fa-instagram"></i> Inquire Solo
          </a>
          <a href="javascript:void(0)" onclick="removeFromInquiryBag('${item.id}')" style="font-size: 0.75rem; color: var(--crimson-600); font-weight: 600;">
            Remove
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function sendAllInquiryBagToInstagram() {
  if (inquiryBag.length === 0) {
    showToast('Your Inquiry Bag is empty!');
    return;
  }

  const notes = document.getElementById('inquiryNotesInput')?.value || '';
  const productList = inquiryBag.map((item, idx) => `${idx + 1}. ${item.name} (${item.subtitle})`).join('\n');

  const message = `Namaste Rupali's Arts! 🙏\n\nI would like to inquire about ordering these handcrafted pieces:\n\n${productList}\n\n${notes ? `*Custom Note / Size:* ${notes}\n\n` : ''}Could you please share details, customization options, and pricing?`;

  redirectToInstagramDM(message);
}

// ==========================================================================
// INSTAGRAM REDIRECTION (ZERO PRICES / DIRECT INQUIRIES)
// ==========================================================================
function orderProductViaInstagram(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  redirectToInstagramDM(product.instagramMessage);
}

function openInstagramDM(topic = 'Festive Home Decor') {
  const text = `Namaste Rupali's Arts! 🙏 I am interested in ordering handcrafted woolen rangolis and Ganpati aasans (${topic}). Please share details!`;
  redirectToInstagramDM(text);
}

function redirectToInstagramDM(prefilledText) {
  const encodedText = encodeURIComponent(prefilledText);
  // Try opening Instagram direct message endpoint
  const url = `https://ig.me/m/rupalis_arts?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function shareProduct(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (navigator.share) {
    navigator.share({
      title: `${product.name} | Rupali's Arts`,
      text: `Look at this beautiful handcrafted ${product.name} by @rupalis_arts! 100% reusable & washable.`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard! Share with friends 🌸');
  }
}

// ==========================================================================
// REVIEWS
// ==========================================================================
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid || typeof REVIEWS_DATA === 'undefined') return;

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

    const text = `Namaste Rupali's Arts! 🙏\n\n*Bespoke Custom Decor Inquiry*\n*Name:* ${name}\n*City:* ${city}\n*Requirements:* ${details}\n\nPlease let me know how to proceed with the custom order!`;
    redirectToInstagramDM(text);
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

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

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
