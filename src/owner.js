// src/owner.js
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
      targetScreen.style.display = 'block';
    }
  });
});
