document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-btn-aww');
  const screens = document.querySelectorAll('.screen');
  const appContainer = document.querySelector('.app-container');
  const locationTrigger = document.getElementById('location-trigger');
  const locationDropdown = document.getElementById('location-dropdown');
  const locationLabel = document.getElementById('current-location-label');
  const feedLiveCount = document.getElementById('feed-live-count');
  const feedLiveLabel = document.getElementById('feed-live-label');
  const feedScrapCount = document.getElementById('feed-scrap-count');
  const feedScrapLabel = document.getElementById('feed-scrap-label');
  const profileRankSubtitle = document.getElementById('profile-rank-subtitle');
  const toolsNearbyCount = document.getElementById('tools-nearby-count');
  const marketSubtitle = document.getElementById('market-subtitle');
  const toolList = document.getElementById('tool-list');
  const timeEl = document.querySelector('.status-bar .time');
  const hoursClockedEl = document.getElementById('hours-clocked');
  const checkinButton = document.querySelector('.btn-checkin-real');
  const checkRows = document.querySelectorAll('[data-check-item]');
  const qrBox = document.querySelector('.qr-box-aww');
  const qrImage = document.querySelector('.qr-img');
  const liveTitle = document.querySelector('#screen-live .header-aww h1');
  const marketPriceEls = document.querySelectorAll('#screen-market .font-inktrap.font-bold.text-lg.text-blue');
  const pickupStrongEls = document.querySelectorAll('#screen-market .pickup-alert strong');
  
  // New Elements for Layout and Search
  const toolSearchInput = document.getElementById('tool-search-input');
  const viewToggleBtn = document.getElementById('view-toggle-btn');
  
  // Card Expansion Elements
  const cardOverlay = document.getElementById('card-overlay');
  const closeOverlayBtn = document.getElementById('overlay-close-btn');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMentor = document.getElementById('overlay-mentor');
  const overlayPrice = document.getElementById('overlay-price');
  const overlayImg = document.getElementById('overlay-img');
  const overlayBadge = document.getElementById('overlay-badge');
  const overlayRating = document.getElementById('overlay-rating');

  const toastStack = document.createElement('div');
  toastStack.className = 'toast-stack';
  document.body.appendChild(toastStack);

  let scannerTimeout;
  let passportAnimated = false;
  const baseMarketPrices = [4500, 850, 2200];

  const locations = [
    { id: 'indiranagar', label: 'Indiranagar, BLR', short: 'Indiranagar', live: 124, scrap: 15, topPercent: 5, tools: 12, marketLine: 'Crafted in Indiranagar. Sold by neighbors.', workshop: "GAGAN'S<br>WORKSHOP", multiplier: 1 },
    { id: 'koramangala', label: 'Koramangala, BLR', short: 'Koramangala', live: 146, scrap: 18, topPercent: 4, tools: 14, marketLine: 'Crafted in Koramangala. Sold by neighbors.', workshop: "KORA<br>WORKSHOP", multiplier: 1.08 },
    { id: 'hsr', label: 'HSR Layout, BLR', short: 'HSR Layout', live: 98, scrap: 11, topPercent: 6, tools: 10, marketLine: 'Crafted in HSR. Sold by neighbors.', workshop: "HSR<br>MAKER LAB", multiplier: 0.94 },
    { id: 'jayanagar', label: 'Jayanagar, BLR', short: 'Jayanagar', live: 115, scrap: 13, topPercent: 7, tools: 11, marketLine: 'Crafted in Jayanagar. Sold by neighbors.', workshop: "JAYA<br>WORKSHOP", multiplier: 0.98 },
    { id: 'malleshwaram', label: 'Malleshwaram, BLR', short: 'Malleshwaram', live: 106, scrap: 9, topPercent: 8, tools: 9, marketLine: 'Crafted in Malleshwaram. Sold by neighbors.', workshop: "MALLESH<br>WORKSHOP", multiplier: 0.95 },
    { id: 'whitefield', label: 'Whitefield, BLR', short: 'Whitefield', live: 173, scrap: 22, topPercent: 3, tools: 16, marketLine: 'Crafted in Whitefield. Sold by neighbors.', workshop: "WHITEFIELD<br>WORKSHOP", multiplier: 1.14 },
    { id: 'sarjapur', label: 'Sarjapur, BLR', short: 'Sarjapur', live: 132, scrap: 17, topPercent: 5, tools: 13, marketLine: 'Crafted in Sarjapur. Sold by neighbors.', workshop: "SARJAPUR<br>WORKSHOP", multiplier: 1.05 },
    { id: 'jp', label: 'JP Nagar, BLR', short: 'JP Nagar', live: 88, scrap: 10, topPercent: 9, tools: 8, marketLine: 'Crafted in JP Nagar. Sold by neighbors.', workshop: "JP NAGAR<br>WORKSHOP", multiplier: 0.9 },
    { id: 'electronic', label: 'Electronic City, BLR', short: 'Electronic City', live: 161, scrap: 20, topPercent: 4, tools: 15, marketLine: 'Crafted in Electronic City. Sold by neighbors.', workshop: "E-CITY<br>WORKSHOP", multiplier: 1.12 },
    { id: 'marathahalli', label: 'Marathahalli, BLR', short: 'Marathahalli', live: 119, scrap: 12, topPercent: 6, tools: 11, marketLine: 'Crafted in Marathahalli. Sold by neighbors.', workshop: "MARATHA<br>WORKSHOP", multiplier: 1.01 },
    { id: 'btm', label: 'BTM Layout, BLR', short: 'BTM Layout', live: 102, scrap: 14, topPercent: 7, tools: 10, marketLine: 'Crafted in BTM. Sold by neighbors.', workshop: "BTM<br>WORKSHOP", multiplier: 0.97 },
    { id: 'hebbal', label: 'Hebbal, BLR', short: 'Hebbal', live: 93, scrap: 8, topPercent: 10, tools: 8, marketLine: 'Crafted in Hebbal. Sold by neighbors.', workshop: "HEBBAL<br>WORKSHOP", multiplier: 0.88 }
  ];

  const toolsCatalog = [
    { name: 'Bosch GSB 600 Drill', owner: 'Vikram S.', area: 'Sec 4', price: 200, rating: '5.0 (14)', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=320&q=80', note: 'Insurance included. Level 1 Verified Users.' },
    { name: 'Makita Circular Saw', owner: 'Aman K.', area: 'Sec 2', price: 320, rating: '4.9 (18)', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=320&q=80', note: 'Blade guard verified today.' },
    { name: 'Black+Decker Jigsaw', owner: 'Aditi N.', area: 'Sec 9', price: 240, rating: '4.7 (9)', image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=320&q=80', note: 'Fresh blades added.' },
    { name: 'Yamaha Drum Kit', owner: 'Arjun R.', area: 'Sec 1', price: 500, rating: '4.8 (8)', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=320&q=80', note: 'Pick-up only via mini-truck.' },
    { name: 'DJI Ronin Gimbal', owner: 'Sunil K.', area: 'K-Block', price: 350, rating: '4.9 (23)', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=320&q=80', note: 'Calibration done before handover.' },
    { name: 'Rode NT1-A Mic', owner: 'Kabir S.', area: 'Sec 9', price: 250, rating: '5.0 (2)', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=320&q=80', note: 'Shock mount included.' },
    { name: 'Ryobi Heat Gun', owner: 'Dhanush T.', area: 'Sec 3', price: 170, rating: '4.6 (6)', image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=320&q=80', note: 'Nozzle set included.' }
  ];

  const appState = {
    locationId: 'indiranagar',
    requestedTools: new Set(),
    reservedItems: new Set(),
    joinedClasses: new Set(),
    checklist: { 1: true, 2: false, 3: true },
    searchQuery: '',
    isGridView: true
  };

  const getLocation = () => locations.find((item) => item.id === appState.locationId) || locations[0];

  const showToast = (message) => {
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.textContent = message;
    toastStack.appendChild(item);
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(8px)';
      setTimeout(() => item.remove(), 180);
    }, 1800);
  };

  const formatPrice = (value) => `₹${new Intl.NumberFormat('en-IN').format(value)}`;

  const updateClock = () => {
    if (!timeEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;
  };

  const renderLocationDropdown = () => {
    if (!locationDropdown) return;
    locationDropdown.innerHTML = '';
    locations.forEach((location) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `location-option${location.id === appState.locationId ? ' active' : ''}`;
      button.textContent = location.label;
      button.addEventListener('click', () => {
        appState.locationId = location.id;
        applyLocationData();
        closeLocationDropdown();
        showToast(`Location changed to ${location.short}`);
      });
      locationDropdown.appendChild(button);
    });
  };

  const openLocationDropdown = () => {
    if (!locationDropdown || !locationTrigger) return;
    renderLocationDropdown();
    locationDropdown.classList.remove('hidden');
    locationTrigger.setAttribute('aria-expanded', 'true');
    locationDropdown.setAttribute('aria-hidden', 'false');
  };

  const closeLocationDropdown = () => {
    if (!locationDropdown || !locationTrigger) return;
    locationDropdown.classList.add('hidden');
    locationTrigger.setAttribute('aria-expanded', 'false');
    locationDropdown.setAttribute('aria-hidden', 'true');
  };

  const renderTools = () => {
    if (!toolList) return;
    const activeLocation = getLocation();
    toolList.innerHTML = '';
    
    // Apply grid/list view class
    if(appState.isGridView) {
      toolList.classList.add('grid-view');
      toolList.classList.remove('flex-col');
    } else {
      toolList.classList.remove('grid-view');
      toolList.classList.add('flex-col');
    }

    const filteredTools = toolsCatalog.filter(t => t.name.toLowerCase().includes(appState.searchQuery.toLowerCase()));

    if(filteredTools.length === 0) {
      toolList.innerHTML = `<p class="m-t-20 text-center text-sm text-secondary" style="grid-column: 1 / -1;">No tools found matching "${appState.searchQuery}"</p>`;
      return;
    }

    filteredTools.forEach((tool, index) => {
      const id = `tool-${index + 1}`;
      const isRequested = appState.requestedTools.has(id);
      const price = Math.round(tool.price * activeLocation.multiplier);
      const card = document.createElement('div');
      card.className = 'tool-card-soft anim-reveal';
      card.style.animationDelay = `${index * 30}ms`;
      card.innerHTML = `
        <div class="flex-row" style="align-items: flex-start; ${!appState.isGridView ? 'gap: 16px;' : ''}">
          <div class="tool-img-box">
            <img src="${tool.image}" alt="${tool.name}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div class="tool-data" style="flex:1; width: 100%;">
            <h2 class="font-inktrap text-md">${tool.name}</h2>
            <p class="text-xs text-secondary">${tool.owner} (${tool.area})</p>
            <div class="flex-between m-t-6">
              <span class="font-inktrap font-bold text-md">${formatPrice(price)} <span class="text-xs font-normal text-secondary">/ day</span></span>
              <span class="text-xs font-bold text-secondary">★ ${tool.rating}</span>
            </div>
          </div>
        </div>
        ${!appState.isGridView ? `<div class="security-banner-light m-t-12">${tool.note} • ${activeLocation.short}</div>` : ''}
        <button class="btn-black-small full-w m-t-12" data-action="request-tool" data-tool-id="${id}">${isRequested ? 'Requested' : 'Request Tool'}</button>
      `;
      toolList.appendChild(card);
    });
  };

  const applyLocationData = () => {
    const location = getLocation();
    if (locationLabel) locationLabel.textContent = location.label;
    if (feedLiveCount) feedLiveCount.textContent = String(location.live);
    if (feedLiveLabel) feedLiveLabel.textContent = `Live in ${location.short}`;
    if (feedScrapCount) feedScrapCount.textContent = String(location.scrap);
    if (feedScrapLabel) feedScrapLabel.textContent = 'Scrap Bins Active';
    if (profileRankSubtitle) profileRankSubtitle.textContent = `Top ${location.topPercent}% in ${location.short}`;
    if (toolsNearbyCount) toolsNearbyCount.textContent = String(location.tools);
    if (marketSubtitle) marketSubtitle.textContent = location.marketLine;
    if (liveTitle) liveTitle.innerHTML = location.workshop;

    marketPriceEls.forEach((priceEl, idx) => {
      const nextPrice = Math.round(baseMarketPrices[idx] * location.multiplier);
      priceEl.textContent = formatPrice(nextPrice);
    });

    pickupStrongEls.forEach((pickupEl) => {
      if (pickupEl.textContent.toLowerCase().includes('gagan')) {
        pickupEl.textContent = `${location.short} Guild Hub (Shelf A)`;
      }
      if (pickupEl.textContent.toLowerCase().includes('priya')) {
        pickupEl.textContent = `${location.short} Ceramics Studio`;
      }
    });

    renderTools();
  };

  const animateCount = (element, from, to, duration, decimal = false) => {
    if (!element) return;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      element.textContent = decimal ? current.toFixed(1) : `${Math.round(current)}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const animatePassportScreen = () => {
    const activePassport = document.getElementById('screen-passport')?.classList.contains('active');
    if (!activePassport) return;

    animateCount(hoursClockedEl, 0, 48, 900, true);
    document.querySelectorAll('.prog-fill').forEach((bar) => {
      const target = Number(bar.getAttribute('data-target-width') || 0);
      bar.style.transition = 'none';
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.transition = 'width 700ms cubic-bezier(0.2, 0.8, 0.2, 1)';
        bar.style.width = `${target}%`;
      });
    });
  };

  const refreshLiveQR = () => {
    if (!qrImage) return;
    const location = getLocation();
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SKILLDD-${location.id}-${Date.now()}`;
  };

  const updateChecklistVisual = () => {
    checkRows.forEach((row) => {
      const key = row.getAttribute('data-check-item');
      const checkBox = row.querySelector('.check-box');
      if (!checkBox || !key) return;
      const checked = Boolean(appState.checklist[key]);
      checkBox.classList.toggle('checked', checked);
      checkBox.innerHTML = checked
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '';
    });

    const allDone = Object.values(appState.checklist).every(Boolean);
    const waitingTitle = document.querySelector('#screen-live .m-x-20.m-t-20 .title-aww');
    if (waitingTitle) waitingTitle.textContent = allDone ? 'READY FOR HANDSHAKE' : 'WAITING FOR HANDSHAKE';
  };

  const setButtonLoading = (button, loading) => {
    if (!button) return;
    button.classList.toggle('is-loading', loading);
    button.disabled = loading;
  };

  const handleActionButton = (button) => {
    const action = button.getAttribute('data-action');
    if (!action) {
      showToast('Action completed');
      return;
    }

    if (action === 'book-class' || action === 'join-class') {
      const card = button.closest('.card-aww');
      const title = card?.querySelector('h2')?.textContent || 'Class';
      const key = title.trim();
      if (appState.joinedClasses.has(key)) {
        appState.joinedClasses.delete(key);
        button.textContent = action === 'book-class' ? 'Book' : 'Join';
        showToast(`Removed ${title} from your schedule`);
      } else {
        appState.joinedClasses.add(key);
        button.textContent = action === 'book-class' ? 'Booked' : 'Joined';
        showToast(`${title} added to your schedule`);
      }
      return;
    }

    if (action === 'request-tool') {
      const toolId = button.getAttribute('data-tool-id') || button.closest('.tool-card-soft')?.querySelector('[data-tool-id]')?.getAttribute('data-tool-id');
      if (!toolId) return;
      const isActive = appState.requestedTools.has(toolId);
      setButtonLoading(button, true);
      setTimeout(() => {
        if (isActive) {
          appState.requestedTools.delete(toolId);
          button.textContent = 'Request Tool';
          showToast('Tool request cancelled');
        } else {
          appState.requestedTools.add(toolId);
          button.textContent = 'Requested';
          showToast('Tool request sent');
        }
        setButtonLoading(button, false);
      }, 350);
      return;
    }

    if (action === 'reserve-item' || action === 'commission-item') {
      const card = button.closest('.card-aww');
      const itemName = card?.querySelector('h2')?.textContent || 'Item';
      if (action === 'commission-item') {
        showToast(`Commission request sent for ${itemName}`);
        button.textContent = 'Requested';
        return;
      }

      if (appState.reservedItems.has(itemName)) {
        appState.reservedItems.delete(itemName);
        button.textContent = 'Reserve Item';
        showToast(`${itemName} released`);
      } else {
        appState.reservedItems.add(itemName);
        button.textContent = 'Reserved';
        showToast(`${itemName} reserved`);
      }
      return;
    }

    if (action === 'call-mentor') {
      button.style.transform = 'scale(0.94)';
      setTimeout(() => {
        button.style.transform = '';
      }, 140);
      showToast('Calling Mentor Sneha...');
      return;
    }

    if (action === 'expand-card' && cardOverlay) {
      const card = button.closest('.card-aww');
      if (!card) return;

      const title = card.querySelector('h2.title-aww')?.textContent || 'Details';
      const mentor = card.querySelector('.text-secondary.text-sm')?.textContent || '';
      const price = card.querySelector('.price-aww')?.innerHTML || '';
      const imgSrc = card.querySelector('img')?.src || '';
      const badge = card.querySelector('.badge-aww');
      const rating = card.querySelector('.text-xs.font-bold')?.textContent || '';

      if (overlayTitle) overlayTitle.textContent = title;
      if (overlayMentor) overlayMentor.textContent = mentor;
      if (overlayPrice) overlayPrice.innerHTML = price;
      if (overlayImg) overlayImg.src = imgSrc;
      if (overlayRating) overlayRating.textContent = rating;
      
      if (overlayBadge) {
         if (badge) {
           overlayBadge.className = badge.className;
           overlayBadge.textContent = badge.textContent;
           overlayBadge.style.display = 'inline-block';
         } else {
           overlayBadge.style.display = 'none';
         }
      }

      cardOverlay.classList.add('active');
    }
  };

  const revealScreenElements = (targetId) => {
    const targetScreen = document.getElementById(targetId);
    if (!targetScreen) return;
    targetScreen.querySelectorAll('.card-aww, .tool-card-soft, .badge-row-sleek, .skill-blk').forEach((el, index) => {
      el.classList.remove('anim-reveal');
      el.style.animationDelay = `${Math.min(index * 20, 240)}ms`;
      void el.offsetWidth;
      el.classList.add('anim-reveal');
    });
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.getAttribute('data-target');

      screens.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      revealScreenElements(targetId);
      
      // Reset scroll on switch
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollTop = 0;
      }

      // Stop scanning if Live session is clicked (1 rotation = 2s)
      if (targetId === 'screen-live') {
        const scanner = document.querySelector('.scan-line');
        if (scanner) {
          scanner.style.display = 'block';
          scanner.style.animation = 'scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite';
        }
        
        clearTimeout(scannerTimeout);
        scannerTimeout = setTimeout(() => {
          if (scanner) {
            scanner.style.animation = 'none';
            scanner.style.display = 'none';
          }
        }, 2000);
      }

      if (targetId === 'screen-passport') {
        animatePassportScreen();
        passportAnimated = true;
      }
    });
  });
  
  // App-level navigation
  window.navigateToScreen = (targetId) => {
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    revealScreenElements(targetId);
    
    // Reset scroll on navigate function
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    navItems.forEach(n => n.classList.remove('active'));
    const correspondingNav = Array.from(navItems).find(n => n.getAttribute('data-target') === targetId);
    if(correspondingNav) {
        correspondingNav.classList.add('active');
    }

    if (targetId === 'screen-live') {
      refreshLiveQR();
      showToast('Live check-in code refreshed');
    }

    if (targetId === 'screen-passport') {
      animatePassportScreen();
      passportAnimated = true;
    }
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button && button.classList.contains('nav-btn-aww')) return;
    if (button && button.id === 'location-trigger') {
      const isOpen = !locationDropdown.classList.contains('hidden');
      if (isOpen) {
        closeLocationDropdown();
      } else {
        openLocationDropdown();
      }
      return;
    }

    if (
      locationDropdown &&
      !locationDropdown.classList.contains('hidden') &&
      !event.target.closest('#location-dropdown')
    ) {
      closeLocationDropdown();
    }

    if (button) {
      handleActionButton(button);
    }
  });

  checkRows.forEach((row) => {
    row.addEventListener('click', () => {
      const key = row.getAttribute('data-check-item');
      if (!key) return;
      appState.checklist[key] = !appState.checklist[key];
      updateChecklistVisual();
    });
  });

  if (qrBox) {
    qrBox.addEventListener('click', () => {
      refreshLiveQR();
      showToast('QR rotated for secure handshake');
    });
  }

  if (checkinButton) {
    checkinButton.addEventListener('click', () => {
      showToast('Joining live check-in');
    });
  }

  document.querySelectorAll('.category-scroll .category-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-scroll .category-pill').forEach((item) => item.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Filter: ${pill.textContent.trim()}`);
    });
  });

  // Handle N key for super long preview
  document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
      if (e.target.tagName === 'INPUT') return;
      if (appContainer) {
        appContainer.classList.toggle('super-long');
      }
    }
  });

  // Tools Setup Event Listeners
  if (toolSearchInput) {
    toolSearchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      renderTools();
    });
  }

  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      appState.isGridView = !appState.isGridView;
      if (appState.isGridView) {
        viewToggleBtn.classList.add('active-grid');
        viewToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="grid-icon" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>';
      } else {
        viewToggleBtn.classList.remove('active-grid');
        viewToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="list-icon" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>';
      }
      renderTools();
    });
  }

  if (closeOverlayBtn && cardOverlay) {
    closeOverlayBtn.addEventListener('click', () => {
      cardOverlay.classList.remove('active');
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
  applyLocationData();
  updateChecklistVisual();
  refreshLiveQR();
  if (!passportAnimated) {
    animatePassportScreen();
  }
});
