document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-btn-aww');
  const screens = document.querySelectorAll('.screen');
  let scannerTimeout;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.getAttribute('data-target');

      screens.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      
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
    });
  });
  
  // App-level navigation
  window.navigateToScreen = (targetId) => {
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    
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
  }

  // Handle N key for super long preview
  document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.classList.toggle('super-long');
      }
    }
  });
});
