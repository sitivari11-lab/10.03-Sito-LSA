document.addEventListener('DOMContentLoaded', () => {
  // ========== MENU OVERLAY ==========
  const menuIcon = document.querySelector('.menu-icon');
  const menuOverlay = document.getElementById('menu-overlay');
  const closeBtn = document.querySelector('.close-btn');

  // Apri menu
  menuIcon.addEventListener('click', () => {
    menuOverlay.classList.remove('hidden');
  });

  // Chiudi menu
  const closeMenu = () => {
    menuOverlay.classList.add('hidden');
  };

  closeBtn.addEventListener('click', closeMenu);

  // Chiudi menu con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuOverlay.classList.contains('hidden')) {
      e.preventDefault();
      closeMenu();
    }
  });

// Chiudi menu cliccando sullo sfondo
menuOverlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeMenu();
  }
});

  // ========== LIGHTBOX ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxCounter = document.querySelector('.lightbox-counter');

  // Ottieni solo le immagini cliccabili (senza .no-lightbox)
  const clickableImages = Array.from(
    document.querySelectorAll('.project-item img:not(.no-lightbox)')
  );
  
  const imageSources = clickableImages.map(img => img.src);
  let currentIndex = 0;
  let startX = 0;

  // Funzione per aprire lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.classList.remove('visible');
    lightbox.classList.add('visible');
    lightbox.classList.remove('hidden');
    lightboxImg.src = imageSources[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${imageSources.length}`;
  };

  // Funzione per chiudere lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('visible');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 300);
  };

  // Naviga alle immagini
  const navigateToImage = (direction) => {
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % imageSources.length;
    } else {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    }
    openLightbox(currentIndex);
  };

  // Bind click sulle miniature
  clickableImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  // Bind eventi lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateToImage('next');
  });
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateToImage('prev');
  });

  // Chiudi cliccando sullo sfondo
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigazione da tastiera
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('visible')) return;
    
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        navigateToImage('next');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigateToImage('prev');
        break;
      case 'Escape':
        e.preventDefault();
        closeLightbox();
        break;
    }
  });

  // Swipe mobile
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
  });

  lightbox.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    
    if (Math.abs(diff) > 50) { // Soglia minima per swipe
      if (diff < 0) {
        navigateToImage('next'); // Swipe left = next
      } else {
        navigateToImage('prev'); // Swipe right = prev
      }
    }
  });

  // Mostra immagine con fade quando caricata
  lightboxImg.addEventListener('load', () => {
    lightboxImg.classList.add('visible');
  });
});

// Aggiungi interattività alle icone social
    document.addEventListener('DOMContentLoaded', () => {
      const socialIcons = document.querySelectorAll('.footer-icons a');
      
      socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          icon.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
          icon.style.transform = 'scale(1)';
        });
      });
});
