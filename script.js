/* ============================================
   טעמי שמחה — Premium Catering One-Pager
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Mark JS as loaded so CSS reveals can engage (impeccable: reveal-safety)
  document.body.classList.add('js-loaded');

  // ==========================================
  // 1. Sticky Navbar
  // ==========================================
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  const handleNavbarScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ==========================================
  // 2. Mobile Menu
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  };

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ==========================================
  // 3. Smooth Scroll Navigation
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 4. Active Section Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightActiveSection = () => {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveSection, { passive: true });

  // ==========================================
  // 5. Scroll Reveal (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 6. Menu Tabs
  // ==========================================
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuContents = document.querySelectorAll('.menu-content');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Remove active from all tabs and contents
      menuTabs.forEach(t => t.classList.remove('active'));
      menuContents.forEach(c => c.classList.remove('active'));

      // Add active to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });

  // ==========================================
  // 7. Gallery Lightbox
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const openLightbox = (imgSrc, imgAlt) => {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Clear image after transition
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const imgAlt = item.querySelector('img').alt;
      openLightbox(imgSrc, imgAlt);
    });
  });

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMenu();
    }
  });

  // ==========================================
  // 8. Parallax effect on hero (subtle)
  // ==========================================
  const heroBg = document.querySelector('.hero-bg img');

  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ==========================================
  // 9. CTA Shimmer Animation (restart on hover)
  // ==========================================
  const heroCta = document.getElementById('heroCta');
  if (heroCta) {
    heroCta.addEventListener('mouseenter', () => {
      heroCta.style.animation = 'none';
      // Force reflow
      void heroCta.offsetHeight;
      heroCta.style.animation = '';
    });
  }

  // ==========================================
  // 10. Lazy Loading for Images
  // ==========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Add a smooth fade-in when image loads
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';

          img.addEventListener('load', () => {
            img.style.opacity = '1';
          }, { once: true });

          // If already loaded (cached)
          if (img.complete) {
            img.style.opacity = '1';
          }

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ==========================================
  // 11. Prevent FOUC — Show page
  // ==========================================
  document.body.style.opacity = '1';

});
