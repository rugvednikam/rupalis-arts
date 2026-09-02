// Rupali's Arts - "Decorate My Space" Visualizer Studio

class DecoratorStudio {
  constructor() {
    this.stage = document.getElementById('decorStage');
    this.canvasArea = document.getElementById('stageDecorCanvas');
    this.ambientOverlay = document.getElementById('stageAmbientOverlay');
    this.bgPresetButtons = document.querySelectorAll('.bg-preset-btn');
    this.decorPickButtons = document.querySelectorAll('.decor-pick-btn');
    this.lightingToggle = document.getElementById('studioLightingToggle');
    this.clearBtn = document.getElementById('btnClearCanvas');
    this.orderSetupBtn = document.getElementById('btnOrderSetupInsta');

    this.placedItems = [];
    this.activeItem = null;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.elementStartX = 0;
    this.elementStartY = 0;

    this.init();
  }

  init() {
    if (!this.stage || !this.canvasArea) return;

    // Presets
    this.bgPresetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.bgPresetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bgId = btn.dataset.bg;
        this.setBackground(bgId);
      });
    });

    // Decor Item Picker
    this.decorPickButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.item;
        this.addItemToCanvas(itemId);
      });
    });

    // Lighting Toggle
    if (this.lightingToggle) {
      this.lightingToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.ambientOverlay.classList.add('night');
          this.setNightMode(true);
        } else {
          this.ambientOverlay.classList.remove('night');
          this.setNightMode(false);
        }
      });
    }

    // Clear Canvas
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearCanvas());
    }

    // Order Look via Instagram
    if (this.orderSetupBtn) {
      this.orderSetupBtn.addEventListener('click', () => this.orderCurrentSetup());
    }

    // Default setup
    this.initDefaultDecor();
  }

  setBackground(bgId) {
    const bgFloor = document.getElementById('stageFloor');
    if (!bgFloor) return;

    switch (bgId) {
      case 'doorstep':
        bgFloor.style.background = 'radial-gradient(circle at center, #4a2c1d 0%, #2b1810 100%)';
        break;
      case 'marble':
        bgFloor.style.background = 'radial-gradient(circle at center, #f5f2eb 0%, #dcd4c7 100%)';
        break;
      case 'terrace':
        bgFloor.style.background = 'radial-gradient(circle at center, #2e303d 0%, #171822 100%)';
        break;
      case 'brass':
        bgFloor.style.background = 'radial-gradient(circle at center, #383431 0%, #1c1917 100%)';
        break;
      default:
        bgFloor.style.background = '#2b1810';
    }
  }

  setNightMode(isNight) {
    const flames = this.canvasArea.querySelectorAll('.canvas-diya-flame');
    flames.forEach(f => {
      f.style.opacity = isNight ? '1' : '0.7';
      f.style.filter = isNight 
        ? 'drop-shadow(0 0 16px rgba(255, 179, 0, 1)) drop-shadow(0 0 30px rgba(255, 87, 34, 0.9))' 
        : 'drop-shadow(0 0 8px rgba(255, 179, 0, 0.7))';
    });
  }

  addItemToCanvas(productId, initialX, initialY) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const canvasRect = this.canvasArea.getBoundingClientRect();
    const x = initialX !== undefined ? initialX : (canvasRect.width / 2 - 60) + (Math.random() * 40 - 20);
    const y = initialY !== undefined ? initialY : (canvasRect.height / 2 - 60) + (Math.random() * 40 - 20);

    const el = document.createElement('div');
    el.className = 'canvas-decor-element';
    el.dataset.id = product.id;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Size based on product type
    let size = 130;
    let isDiya = product.category === 'diyas';
    if (isDiya) size = 80;
    if (product.category === 'detachable') size = 150;

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:contain;" />
      ${isDiya ? '<div class="canvas-diya-flame animate-flame"></div>' : ''}
    `;

    this.canvasArea.appendChild(el);
    this.placedItems.push({ element: el, product: product });

    this.attachDragListeners(el);
    this.selectItem(el);
  }

  selectItem(el) {
    this.canvasArea.querySelectorAll('.canvas-decor-element').forEach(item => item.classList.remove('active'));
    if (el) {
      el.classList.add('active');
      this.activeItem = el;
    } else {
      this.activeItem = null;
    }
  }

  attachDragListeners(el) {
    const onStart = (e) => {
      this.isDragging = true;
      this.selectItem(el);

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.elementStartX = parseFloat(el.style.left) || 0;
      this.elementStartY = parseFloat(el.style.top) || 0;

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!this.isDragging) return;
      if (e.type.includes('touch')) e.preventDefault();

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;

      const newX = this.elementStartX + deltaX;
      const newY = this.elementStartY + deltaY;

      const canvasRect = this.canvasArea.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      // Keep within bounds
      const boundedX = Math.max(-20, Math.min(newX, canvasRect.width - elRect.width + 20));
      const boundedY = Math.max(-20, Math.min(newY, canvasRect.height - elRect.height + 20));

      el.style.left = `${boundedX}px`;
      el.style.top = `${boundedY}px`;
    };

    const onEnd = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, { passive: false });
  }

  clearCanvas() {
    this.canvasArea.innerHTML = '';
    this.placedItems = [];
    this.activeItem = null;
  }

  initDefaultDecor() {
    this.clearCanvas();
    // Pre-place a nice centerpiece and two diyas
    setTimeout(() => {
      const rect = this.canvasArea.getBoundingClientRect();
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      this.addItemToCanvas('woolen-rangoli-small', midX - 65, midY - 65);
      this.addItemToCanvas('handmade-diya-holders', midX - 130, midY - 35);
      this.addItemToCanvas('handmade-diya-holders', midX + 60, midY - 35);
    }, 200);
  }

  orderCurrentSetup() {
    if (this.placedItems.length === 0) {
      alert("Please place some decor items on the stage before ordering!");
      return;
    }

    const itemCounts = {};
    this.placedItems.forEach(item => {
      const name = item.product.name;
      itemCounts[name] = (itemCounts[name] || 0) + 1;
    });

    let itemsListStr = Object.entries(itemCounts)
      .map(([name, count]) => `• ${count}x ${name}`)
      .join('\n');

    const message = `Namaste Rupali's Arts! 🙏\n\nI customized a festive look using the 'Decorate My Space' studio on your website and would love to order this combination:\n\n${itemsListStr}\n\nCould you please share the details and confirmation for this customized set?`;

    // Direct redirection to Instagram DM
    const encodedMsg = encodeURIComponent(message);
    const igDirectUrl = `https://ig.me/m/rupalis_arts?text=${encodedMsg}`;
    
    // Copy to clipboard for easy pasting if app opens directly to thread
    navigator.clipboard?.writeText(message);
    
    window.open(igDirectUrl, '_blank');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.decoratorStudio = new DecoratorStudio();
});
