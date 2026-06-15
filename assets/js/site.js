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

  /* ---------- Lightbox / museum-style document viewer ---------- */
  var zoomTriggers = document.querySelectorAll('.zoomable-wrap');
  if (zoomTriggers.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML =
      '<div class="lightbox-toolbar">' +
        '<button class="lightbox-btn" type="button" data-action="zoom-out" aria-label="Zoom out">−</button>' +
        '<button class="lightbox-btn" type="button" data-action="zoom-in" aria-label="Zoom in">+</button>' +
        '<button class="lightbox-btn" type="button" data-action="close" aria-label="Close viewer">×</button>' +
      '</div>' +
      '<div class="lightbox-stage"><img alt=""></div>' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    var stage = overlay.querySelector('.lightbox-stage');
    var lbImg = overlay.querySelector('img');
    var captionEl = overlay.querySelector('.lightbox-caption');
    var closeBtn = overlay.querySelector('[data-action="close"]');
    var zoomInBtn = overlay.querySelector('[data-action="zoom-in"]');
    var zoomOutBtn = overlay.querySelector('[data-action="zoom-out"]');

    var scale = 1, tx = 0, ty = 0, dragging = false, startX = 0, startY = 0, lastFocused = null;
    var MIN_SCALE = 1, MAX_SCALE = 4, STEP = 0.5;

    function applyTransform() {
      lbImg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
      stage.classList.toggle('is-zoomed', scale > 1);
    }

    function setScale(next) {
      scale = Math.min(Math.max(next, MIN_SCALE), MAX_SCALE);
      if (scale === MIN_SCALE) { tx = 0; ty = 0; }
      applyTransform();
    }

    function openLightbox(trigger) {
      var triggerImg = trigger.querySelector('img');
      lbImg.src = trigger.getAttribute('data-lightbox-src') || triggerImg.src;
      lbImg.alt = trigger.getAttribute('data-lightbox-alt') || triggerImg.alt || '';
      captionEl.textContent = trigger.getAttribute('data-lightbox-caption') || '';
      scale = 1; tx = 0; ty = 0;
      applyTransform();
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function closeLightbox() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    zoomTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () { openLightbox(trigger); });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener('click', closeLightbox);
    zoomInBtn.addEventListener('click', function () { setScale(scale + STEP); });
    zoomOutBtn.addEventListener('click', function () { setScale(scale - STEP); });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeLightbox(); }
      else if (e.key === '+' || e.key === '=') { setScale(scale + STEP); }
      else if (e.key === '-' || e.key === '_') { setScale(scale - STEP); }
    });

    lbImg.addEventListener('dblclick', function () {
      setScale(scale > 1 ? 1 : 2.5);
    });

    stage.addEventListener('wheel', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      e.preventDefault();
      setScale(scale + (e.deltaY > 0 ? -STEP : STEP));
    }, { passive: false });

    function pointerDown(e) {
      if (scale <= 1) return;
      dragging = true;
      stage.classList.add('is-dragging');
      var p = e.touches ? e.touches[0] : e;
      startX = p.clientX - tx;
      startY = p.clientY - ty;
    }
    function pointerMove(e) {
      if (!dragging) return;
      var p = e.touches ? e.touches[0] : e;
      tx = p.clientX - startX;
      ty = p.clientY - startY;
      applyTransform();
    }
    function pointerUp() {
      dragging = false;
      stage.classList.remove('is-dragging');
    }

    stage.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);
    stage.addEventListener('touchstart', pointerDown, { passive: true });
    stage.addEventListener('touchmove', pointerMove, { passive: true });
    stage.addEventListener('touchend', pointerUp);
  }

  /* ---------- Artist discovery modal ---------- */
  var artistButtons = document.querySelectorAll('.artist-name[data-artist]');
  var profiles = window.ARTIST_PROFILES || {};
  if (artistButtons.length) {
    var amOverlay = document.createElement('div');
    amOverlay.className = 'artist-modal-overlay';
    amOverlay.innerHTML =
      '<div class="artist-modal" role="dialog" aria-modal="true" aria-labelledby="artist-modal-name" aria-describedby="artist-modal-bio">' +
        '<button class="artist-modal__close" type="button" aria-label="Close artist profile">×</button>' +
        '<p class="artist-modal__eyebrow"></p>' +
        '<h3 class="artist-modal__name" id="artist-modal-name"></h3>' +
        '<p class="artist-modal__disclaimer" hidden></p>' +
        '<div class="artist-modal__bio" id="artist-modal-bio"></div>' +
        '<a class="btn artist-modal__link" target="_blank" rel="noopener" hidden></a>' +
      '</div>';
    document.body.appendChild(amOverlay);

    var amDialog = amOverlay.querySelector('.artist-modal');
    var amClose = amOverlay.querySelector('.artist-modal__close');
    var amRole = amOverlay.querySelector('.artist-modal__eyebrow');
    var amName = amOverlay.querySelector('.artist-modal__name');
    var amDisclaimer = amOverlay.querySelector('.artist-modal__disclaimer');
    var amBio = amOverlay.querySelector('.artist-modal__bio');
    var amLink = amOverlay.querySelector('.artist-modal__link');
    var amLastFocused = null;

    var AI_DISCLAIMER = 'Explanation generated by AI because publicly available information about this individual could not be reliably found online. This summary is based only on information contained in the event materials and may be incomplete.';

    function openArtistModal(profile) {
      amName.textContent = profile.name;
      amRole.textContent = profile.role || '';
      amBio.innerHTML = '<p>' + profile.bio + '</p>';

      if (profile.verified) {
        amDisclaimer.hidden = true;
        amDisclaimer.textContent = '';
      } else {
        amDisclaimer.hidden = false;
        amDisclaimer.textContent = AI_DISCLAIMER;
      }

      if (profile.source && profile.source.url) {
        amLink.href = profile.source.url;
        amLink.innerHTML = 'Read more on ' + profile.source.label + ' <span class="arrow" aria-hidden="true">↗</span>';
        amLink.setAttribute('aria-label', 'Read more about ' + profile.name + ' on ' + profile.source.label + ' (opens in a new tab)');
        amLink.hidden = false;
      } else {
        amLink.hidden = true;
      }

      amLastFocused = document.activeElement;
      amOverlay.classList.add('is-open');
      document.body.classList.add('artist-modal-open');
      amClose.focus();
    }

    function closeArtistModal() {
      amOverlay.classList.remove('is-open');
      document.body.classList.remove('artist-modal-open');
      if (amLastFocused && typeof amLastFocused.focus === 'function') amLastFocused.focus();
    }

    artistButtons.forEach(function (btn) {
      var id = btn.getAttribute('data-artist');
      var profile = profiles[id];
      if (!profile) return;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-label', (profile.verified ? '' : 'AI-generated profile: ') + 'Learn more about ' + profile.name);
      btn.setAttribute('data-tooltip', (profile.verified ? '🔍' : '✨') + ' Click to learn more');
      btn.addEventListener('click', function () { openArtistModal(profile); });
    });

    amOverlay.addEventListener('click', function (e) {
      if (e.target === amOverlay) closeArtistModal();
    });
    amClose.addEventListener('click', closeArtistModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && amOverlay.classList.contains('is-open')) closeArtistModal();
    });

    amDialog.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = amDialog.querySelectorAll('button, a[href]');
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

})();
