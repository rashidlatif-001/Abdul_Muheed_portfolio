/**
 * Abdul Muheed - Personal Portfolio JavaScript
 * Modern, clean, modular, and performance-optimized.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Toggle (Dark / Light Mode)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to system preference or dark
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // =========================================================================
  // 2. Sticky Header & Back-to-Top Button Visibility
  // =========================================================================
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Top scroll progress bar
    const scrollProgressBar = document.getElementById('scroll-progress');
    if (scrollProgressBar) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        const progress = (scrollPos / windowHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;
      }
    }

    // Header blur effect
    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 3. Mobile Navigation Menu
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 4. Active Navigation Spy on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // =========================================================================
  // 5. Dynamic Typing Animation (Hero Subtitle)
  // =========================================================================
  const typedTextElement = document.getElementById('typed-text');
  const wordsToType = [
    'Frontend Developer (Next.js & React)',
    'M1 Luxury Marketplace Intern',
    'UI/UX Designer (Figma)',
    'Software Engineer (BSSE)',
    'React Native & Mobile Developer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextElement) return;

    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing
  typeEffect();

  // =========================================================================
  // 6. Number Counter Animation (About Section)
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentVal = Math.floor(progress * target);

        counter.textContent = currentVal + '+';

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // =========================================================================
  // 7. Animated Skill Progress Bars (Skills Section)
  // =========================================================================
  const progressBars = document.querySelectorAll('.skill-progress');
  let skillsAnimated = false;

  function animateSkills() {
    progressBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        bar.style.width = `${progress}%`;
      }
    });
  }

  // Set widths immediately so lines are never blank
  animateSkills();

  // Observer for Stats and Skills animation trigger
  const statsTarget = document.querySelector('.stats-grid') || document.getElementById('about');
  if (statsTarget) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          animateCounters();
          countersStarted = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(statsTarget);
  }

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          animateSkills();
          skillsAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillsObserver.observe(skillsSection);
  }

  // =========================================================================
  // 8. Projects Filter Functionality
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 9. Contact Form Interactive Validation & Submission
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const alertCloseBtn = document.getElementById('alert-close');

  // Input Error Helper
  function showError(inputElement, errorElementId, message) {
    inputElement.classList.add('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearError(inputElement, errorElementId) {
    inputElement.classList.remove('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.classList.remove('visible');
    }
  }

  // Email regex validator
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Clear errors on user input
  if (nameInput) {
    nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
  }
  if (subjectInput) {
    subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'name-error', 'Please enter your name');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        showError(emailInput, 'email-error', 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'subject-error', 'Please enter a subject');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message (at least 3 chars)
      if (!messageInput.value.trim()) {
        showError(messageInput, 'message-error', 'Please enter your message');
        isValid = false;
      } else if (messageInput.value.trim().length < 3) {
        showError(messageInput, 'message-error', 'Message must be at least 3 characters long');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      if (!isValid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        _subject: `Portfolio Message: ${subjectInput.value.trim()} (from ${nameInput.value.trim()})`,
        _template: 'table',
        _captcha: 'false'
      };

      const bodyText = `From: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=abdulmuheed778@gmail.com&su=${encodeURIComponent(
        payload.subject
      )}&body=${encodeURIComponent(bodyText)}`;

      function showFormNotification(title, message, isSuccess) {
        if (!formSuccess) return;
        const titleEl = formSuccess.querySelector('.alert-title');
        const textEl = formSuccess.querySelector('.alert-text');
        const iconEl = formSuccess.querySelector('i');

        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = message;
        if (iconEl) {
          iconEl.className = isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
        }

        formSuccess.style.display = 'flex';
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 8000);
      }

      // Send via FormSubmit AJAX service
      fetch('https://formsubmit.co/ajax/abdulmuheed778@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then((res) => res.json())
      .then((data) => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();

        if (data.success === 'true' || data.success === true) {
          showFormNotification(
            'Message Sent Successfully!',
            'Thank you for reaching out. Your email has been delivered to abdulmuheed778@gmail.com.',
            true
          );
        } else {
          // Fallback: Open Gmail Compose with message pre-filled
          window.open(gmailUrl, '_blank');
          showFormNotification(
            'Opening Gmail Compose...',
            'We have prepared your message in Gmail ready to send directly to abdulmuheed778@gmail.com.',
            true
          );
        }
      })
      .catch(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();
        window.open(gmailUrl, '_blank');
        showFormNotification(
          'Opening Gmail Compose...',
          'We have prepared your message in Gmail ready to send directly to abdulmuheed778@gmail.com.',
          true
        );
      });
    });
  }

  // Direct WhatsApp Button Handler (Instant SMS / Message)
  const whatsappBtn = document.getElementById('whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let text = `*New Portfolio Message*`;
      if (name) text += `\n*From:* ${name}`;
      if (email) text += `\n*Email:* ${email}`;
      if (subject) text += `\n*Subject:* ${subject}`;
      if (message) text += `\n*Message:* ${message}`;
      if (!name && !message) {
        text = `Hi Muheed! I saw your portfolio and would like to talk to you about an opportunity.`;
      }

      window.open(`https://wa.me/923150519274?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  if (alertCloseBtn && formSuccess) {
    alertCloseBtn.addEventListener('click', () => {
      formSuccess.style.display = 'none';
    });
  }

  // =========================================================================
  // 10. Official CV Download Handler
  // =========================================================================
  const cvBtn = document.getElementById('cv-download-btn');
  if (cvBtn) {
    cvBtn.setAttribute('href', 'Abdul_Muheed_CV.pdf');
    cvBtn.setAttribute('download', 'Abdul_Muheed_CV.pdf');
    cvBtn.setAttribute('target', '_blank');
  }

  // =========================================================================
  // 11. Staggered Scroll Reveal & Interactive Mouse Spotlight
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '.section-header, .about-card-creative, .about-content-col, .stat-card, .timeline-item, .skills-category-card, .project-card, .contact-card, .contact-form-wrapper'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  // Staggered transitions for grid items
  const gridContainers = document.querySelectorAll('.stats-grid, .skills-grid, .projects-grid, .contact-cards');
  gridContainers.forEach((grid) => {
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      const delay = (idx % 3) * 0.12;
      if (delay > 0) {
        child.style.transitionDelay = `${delay}s`;
      }
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Interactive Mouse Spotlight Tracking for Cards
  const interactiveCards = document.querySelectorAll('.project-card, .skills-category-card, .timeline-content');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-500px');
      card.style.setProperty('--mouse-y', '-500px');
    });
  });

  // =========================================================================
  // 12. Current Year in Footer
  // =========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
