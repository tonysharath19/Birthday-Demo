document.addEventListener('DOMContentLoaded', () => {
  const jerryImage = document.getElementById('jerryImage');
  const cheeseImage = document.getElementById('cheeseImage');
  const bgAudio = document.getElementById('bgAudio');
  const bgVideo = document.getElementById('bgVideo');

  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuVenue = document.getElementById('menuVenue');
  const menuAbout = document.getElementById('menuAbout');
  const closeMenuBtn = document.querySelector('.close-menu');

  // ---------- MENU ----------
  function openMenu() { document.body.classList.add('menu-open'); }
  function closeMenu() { document.body.classList.remove('menu-open'); }

  hamburger.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); });
  menuOverlay.addEventListener('click', closeMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  menuVenue.addEventListener('click', () => {
    closeMenu();
    window.open('https://maps.app.goo.gl/rq9RxQneAw42Njpo8', '_blank');
  });

  menuAbout.addEventListener('click', () => {
    closeMenu();
    window.open('https://raayacreations.onrender.com', '_blank');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ---------- DRAGGING (mouse + touch) ----------
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  const getEventPosition = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    e.preventDefault();
    isDragging = true;
    jerryImage.classList.add('dragging');

    const pos = getEventPosition(e);
    const rect = jerryImage.getBoundingClientRect();
    offsetX = pos.x - rect.left;
    offsetY = pos.y - rect.top;

    jerryImage.style.transition = 'none';
  };

  const moveDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const pos = getEventPosition(e);
    const x = pos.x - offsetX;
    const y = pos.y - offsetY;

    jerryImage.style.left = x + 'px';
    jerryImage.style.top = y + 'px';
  };

  const endDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    isDragging = false;
    jerryImage.classList.remove('dragging');

    const jerryRect = jerryImage.getBoundingClientRect();
    const cheeseRect = cheeseImage.getBoundingClientRect();

    const distance = Math.sqrt(
      Math.pow(jerryRect.left + jerryRect.width / 2 - (cheeseRect.left + cheeseRect.width / 2), 2) +
      Math.pow(jerryRect.top + jerryRect.height / 2 - (cheeseRect.top + cheeseRect.height / 2), 2)
    );

    if (distance < 120) {
      slideJerryToCheese(jerryRect, cheeseRect);
    }
  };

  // Mouse + touch support
  jerryImage.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', moveDrag);
  document.addEventListener('mouseup', endDrag);
  jerryImage.addEventListener('touchstart', startDrag, { passive: false });
  document.addEventListener('touchmove', moveDrag, { passive: false });
  document.addEventListener('touchend', endDrag, { passive: false });

  // ---------- SLIDE ----------
  function slideJerryToCheese(jerryRect, cheeseRect) {
    const startX = jerryRect.left;
    const startY = jerryRect.top;
    const endX = cheeseRect.left + cheeseRect.width / 2 - jerryRect.width / 2;
    const endY = cheeseRect.top + cheeseRect.height / 2 - jerryRect.height / 2;

    const duration = 800;
    const startTime = performance.now();

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const currentX = startX + (endX - startX) * ease;
      const currentY = startY + (endY - startY) * ease;

      jerryImage.style.left = currentX + 'px';
      jerryImage.style.top = currentY + 'px';

      if (progress < 1) requestAnimationFrame(animate);
      else triggerVideo();
    }

    requestAnimationFrame(animate);
  }

  // ---------- VIDEO ----------
  function triggerVideo() {
    document.querySelector('.content').style.display = 'none';

    bgAudio.muted = false;
    bgAudio.volume = 1.0;
    bgAudio.play().catch((e) => console.error('Audio play failed:', e));

    // Stop audio after 30 seconds
    setTimeout(() => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }, 30000);

    document.getElementById('videoContainer').style.display = 'block';
    bgVideo.muted = false;
    bgVideo.volume = 1.0;
    bgVideo.play().catch((e) => console.error('Video play failed:', e));


  }
});
