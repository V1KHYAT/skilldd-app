// src/mentor.js
// System Clock
function updateClock() {
  const clock = document.getElementById('sys-time');
  if (clock) {
    const now = new Date();
    clock.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  }
}
setInterval(updateClock, 1000);
updateClock();

// App Navigation
const navBtns = document.querySelectorAll('.nav-btn-aww[data-target]');
const screens = document.querySelectorAll('.screen');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset all
    navBtns.forEach(b => b.classList.remove('active'));
    screens.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    // Set active
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    const targetScreen = document.getElementById(targetId);
    
    if(targetScreen) {
      targetScreen.classList.add('active');
      // Scan screen needs to be flex to maintain its structure correctly
      if (targetId === 'screen-mentor-scan') {
        targetScreen.style.display = 'flex';
      } else {
        targetScreen.style.display = 'block';
      }
    }
  });
});

// Dynamic Pricing Slider Engine
const priceSlider = document.getElementById('price-slider');
const priceVal = document.getElementById('price-val');

if (priceSlider && priceVal) {
    priceSlider.addEventListener('input', (e) => {
        const num = Number(e.target.value);
        priceVal.textContent = '₹' + num.toLocaleString('en-IN');
        
        // Add minimal scale effect on the text
        priceVal.style.transform = 'scale(1.1)';
        setTimeout(() => {
            priceVal.style.transform = 'scale(1)';
        }, 100);
    });
    
    priceVal.style.transition = 'transform 0.1s ease-out';
}

// Validator Scanner Logic
const triggerBtn = document.getElementById('trigger-scan-btn');
const freezeBtn = document.getElementById('freeze-btn');

if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
        triggerBtn.textContent = 'Authenticating...';
        triggerBtn.style.opacity = '0.7';
        triggerBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            triggerBtn.textContent = 'Learner Verified ✓';
            triggerBtn.style.background = '#10B981'; // Success Green
            triggerBtn.style.opacity = '1';
            
            // Revert after 3s
            setTimeout(() => {
                triggerBtn.textContent = 'Mock Secure Handshake';
                triggerBtn.style.background = '#111';
                triggerBtn.style.pointerEvents = 'auto';
            }, 3000);
        }, 1500);
    });
}

if (freezeBtn) {
    let frozen = false;
    freezeBtn.addEventListener('click', () => {
        frozen = !frozen;
        if(frozen) {
            freezeBtn.textContent = 'UNFREEZE';
            freezeBtn.style.background = '#111';
            document.querySelector('.scanline').style.animationPlayState = 'paused';
        } else {
            freezeBtn.textContent = 'FREEZE';
            freezeBtn.style.background = '#cc0000';
            document.querySelector('.scanline').style.animationPlayState = 'running';
        }
    });
}
