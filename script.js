

window.addEventListener('DOMContentLoaded', () => {
    console.log("JS Loaded ✅");
  
    // Load navbar
    fetch('/partials/nav.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('navbar').innerHTML = data;
      });
  
    // Load footer
    fetch('/partials/footer.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  
    // Smooth scroll
    document.querySelector('.explore')?.addEventListener('click', () => {
      document.querySelector('.category')?.scrollIntoView({ behavior: 'smooth' });
    });
  
    document.querySelector('.request')?.addEventListener('click', () => {
      document.querySelector('.register')?.scrollIntoView({ behavior: 'smooth' });
    });
  
    // Lazy load images
    const lazyImages = document.querySelectorAll('img.lazy');
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            console.log("Loading image:", img.dataset.src);
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            obs.unobserve(img);
          }
        });
      }, {
        root: null,
        rootMargin: "100px",  // preload slightly before in view
        threshold: 0.01
      });
  
      lazyImages.forEach(img => observer.observe(img));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        console.log("Fallback loaded:", img.dataset.src);
      });
    }
  
    // Extra fallback after delay in case observer doesn't trigger
    setTimeout(() => {
      document.querySelectorAll('img.lazy').forEach(img => {
        if (!img.src) {
          img.src = img.dataset.src;
          console.log("Timeout fallback loaded:", img.dataset.src);
        }
      });
    }, 5000);


        // Add hover effects for artist images
        const creators = document.querySelectorAll('.creatorImg');
        creators.forEach(creator => {
            creator.addEventListener('mouseenter', () => {
                creator.classList.add('hovered');
            });
            creator.addEventListener('mouseleave', () => {
                creator.classList.remove('hovered');
            });
        });
  });


  