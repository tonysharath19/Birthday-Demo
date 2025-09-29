document.addEventListener('DOMContentLoaded', () => {
  const munchkinText = document.getElementById('munchkinText');
  const glowImage = document.getElementById('glowImage');
  const tapMe = document.getElementById('tapMe');
  const bgAudio = document.getElementById('bgAudio');
  const bgVideo = document.getElementById('bgVideo');
  const invitationText = document.getElementById('invitationText');
  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuVenue = document.getElementById('menuVenue');
  const menuAbout = document.getElementById('menuAbout');
  const closeMenuBtn = document.querySelector('.close-menu');

  // Helper function to add animation with promise
  function animateElement(element, animationName, duration) {
    return new Promise((resolve) => {
      element.style.animation = `${animationName} ${duration} forwards`;
      setTimeout(() => {
        resolve();
      }, duration * 1000);
    });
  }

  // Menu functionality
  function openMenu() {
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  menuOverlay.addEventListener('click', closeMenu);

  closeMenuBtn.addEventListener('click', closeMenu);

  menuVenue.addEventListener('click', () => {
    closeMenu();
    window.open('https://www.google.com/maps/place/Random+Location', '_blank');
  });

  menuAbout.addEventListener('click', () => {
    closeMenu();
    window.open('https://raayacreations.onrender.com', '_blank');
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Initial flow
  async function startFlow() {
    // 2 second delay for background
    await new Promise(r => setTimeout(r, 2000));

    // Fade in and glow munchkin text for 3s (slower)
    await animateElement(munchkinText, 'slowFadeInUpGlow', 1);

    // Make image appear instantly without animation
    glowImage.style.opacity = '1';

    // Show tapMe text and animate hover glow for 2.5s then hide
    tapMe.style.opacity = '1';
    tapMe.style.animation = 'hoverGlowRed 2.5s infinite';
    await new Promise(r => setTimeout(r, 2500));
    tapMe.style.opacity = '0';
    tapMe.style.animation = '';
  }

  // Click handler for image
  glowImage.addEventListener('click', () => {
    // Stop pulsating animation
    glowImage.style.animation = '';

    // Glow pink
    glowImage.classList.add('glow-pink');

    // Play background audio
    bgAudio.muted = false;
    bgAudio.volume = 1.0;
    bgAudio.play().catch((e) => console.error('Audio play failed:', e));

    // After 2 seconds, show video and invitation text
    setTimeout(() => {
      // Hide current content
      munchkinText.style.display = 'none';
      tapMe.style.display = 'none';
      glowImage.style.display = 'none';

      // Show and play background video
      bgVideo.style.display = 'block';
      bgVideo.muted = false;
      bgVideo.volume = 1.0;
      bgVideo.play().catch((e) => console.error('Video play failed:', e));

      // Show invitation text
      invitationText.style.display = 'flex';
      invitationText.style.opacity = '1';
    }, 2000);
  });

  // Also allow tapMe text to trigger click on image
  tapMe.addEventListener('click', () => {
    glowImage.click();
  });

  startFlow();
});
