/* Nel Coloma-Moya — Portfolio site behaviour */
(function () {
  'use strict';

  var html = document.documentElement;

  /* ---------- Reveal-on-scroll ---------- */
  html.classList.add('anim-ready');

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Sticky header shadow + scroll progress ---------- */
  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.scroll-progress');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        progress.style.transform = 'scaleX(' + pct + ')';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('primary-nav');

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navLinks.classList.add('open');
    document.body.classList.add('menu-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    /* Close the menu after a nav item is selected (mobile) */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ---------- Scrollspy: highlight active nav link ---------- */
  var sections = Array.prototype.filter.call(
    document.querySelectorAll('main section[id]'),
    function (s) { return s.id; }
  );
  var navLinkMap = {};
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href.charAt(0) === '#') {
      navLinkMap[href.slice(1)] = link;
    }
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link.active').forEach(function (a) {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
          });
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toString();
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.querySelector('.form[data-validate]');
  var formWrap = document.querySelector('.form-wrap');
  var formSuccess = document.querySelector('.form-success');
  var nameSlot = document.querySelector('[data-name-slot]');

  function setError(field, message) {
    var wrapper = field.closest('.field');
    if (!wrapper) return;
    var errorEl = wrapper.querySelector('.error');
    wrapper.classList.toggle('invalid', !!message);
    if (errorEl) errorEl.textContent = message || '';
  }

  function validateField(field) {
    var value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      setError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && value) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setError(field, 'Please enter a valid email address.');
        return false;
      }
    }
    setError(field, '');
    return true;
  }

  if (form) {
    var requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        var firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var nameField = form.querySelector('#name');
      if (nameSlot && nameField && nameField.value.trim()) {
        nameSlot.textContent = nameField.value.trim().split(/\s+/)[0];
      }

      if (formWrap) formWrap.classList.add('sent');
      if (formSuccess) {
        formSuccess.classList.add('show');
        formSuccess.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

})();
