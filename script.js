/* =======================================================
   Elumalai | Personal Developer Portfolio
   JavaScript: Animations, Mobile Menu, Interactivity
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Dynamic Typing Effect in Hero --- */
  const typedTextElement = document.getElementById('typed-text');
  const roles = [
    'IT Student',
    'Frontend Developer',
    'Web Developer',
    'Python Programmer',
    'C++ Enthusiast'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1800;

  function typeEffect() {
    if (!typedTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
    } else {
      const delay = isDeleting ? erasingDelay : typingDelay;
      setTimeout(typeEffect, delay);
    }
  }

  // Start typing animation
  setTimeout(typeEffect, 600);


  /* --- Mobile Navigation Menu Toggle --- */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close menu on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
      }
    });
  });


  /* --- Sticky Header with Background Blur --- */
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow & blur
    if (header) {
      if (scrollY >= 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Show / Hide Scroll To Top Button
    if (scrollTopBtn) {
      if (scrollY >= 350) {
        scrollTopBtn.classList.add('show-scroll');
      } else {
        scrollTopBtn.classList.remove('show-scroll');
      }
    }

    // Highlight active link in navbar
    highlightActiveLink(scrollY);
  });


  /* --- Active Navigation Link on Scroll --- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink(scrollY) {
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active-link');
        } else {
          targetNavLink.classList.remove('active-link');
        }
      }
    });
  }


  /* --- Scroll Reveal Animations (IntersectionObserver) --- */
  const animatedElements = document.querySelectorAll(
    '.about-container, .skills-container, .projects-container, .timeline, .resume-card-wrap, .contact-container'
  );

  animatedElements.forEach(el => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    animatedElements.forEach(el => el.classList.add('appear'));
  }


  /* --- Toast Notification Helper --- */
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message, isSuccess = true) {
    if (!toast || !toastMessage) return;

    clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.style.background = isSuccess ? '#10b981' : '#ef4444';
    toast.classList.add('show-toast');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show-toast');
    }, 4000);
  }


  /* --- Contact Form Handling --- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name').value.trim();
      const emailInput = document.getElementById('email').value.trim();
      const subjectInput = document.getElementById('subject').value.trim();
      const messageInput = document.getElementById('message').value.trim();

      if (!nameInput || !emailInput || !messageInput) {
        showToast('Please fill in all required fields!', false);
        return;
      }

      // Simulate sending state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        contactForm.reset();
        showToast(`Thank you ${nameInput}! Your message has been sent successfully. ✨`);
      }, 1000);
    });
  }


  /* --- Resume Download Button Feedback --- */
  const resumeDownloadBtn = document.getElementById('resume-download-btn');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Resume template ready! Place your PDF in the assets folder.');
    });
  }


  /* --- Current Year in Footer --- */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
