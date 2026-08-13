/* ==========================================================================
   Liquid Glass — moteur d'animation
   Sans dépendance. Tout est piloté par des attributs data-, de sorte que le
   même script anime le thème Shopify et la maquette statique.

   Attributs reconnus
     data-lg-reveal              apparition au défilement
     data-lg-stagger             décale l'apparition des enfants (ms)
     data-lg-split               titre révélé mot à mot
     data-lg-glass               suit le pointeur pour le halo spéculaire
     data-lg-tilt                inclinaison 3D au pointeur
     data-lg-magnetic            attire l'élément vers le curseur
     data-lg-parallax="0.2"      décalage vertical au défilement
     data-lg-count               compte jusqu'à la valeur finale
     data-lg-marquee             duplique la piste pour une boucle continue
     data-lg-family              carte famille avec sélecteur de coloris
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  function calm() {
    return reduced.matches;
  }

  function each(root, selector, fn) {
    Array.prototype.forEach.call(root.querySelectorAll(selector), fn);
  }

  /* ---------------------------------------------------------------- Reveal */

  var revealObserver = null;

  function getRevealObserver() {
    if (revealObserver) return revealObserver;
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );
    return revealObserver;
  }

  function initReveal(root) {
    // Un parent peut cadencer ses enfants : data-lg-stagger="90"
    each(root, '[data-lg-stagger]', function (parent) {
      var step = parseInt(parent.getAttribute('data-lg-stagger'), 10) || 80;
      var kids = parent.querySelectorAll('[data-lg-reveal]');
      Array.prototype.forEach.call(kids, function (kid, i) {
        kid.style.setProperty('--lg-delay', i * step + 'ms');
      });
    });

    each(root, '[data-lg-reveal]', function (el) {
      if (calm()) {
        el.classList.add('is-in');
        return;
      }
      getRevealObserver().observe(el);
    });
  }

  /* ------------------------------------------------------------ Split text */

  function initSplit(root) {
    each(root, '[data-lg-split]', function (el) {
      if (el.dataset.lgSplitDone) return;
      el.dataset.lgSplitDone = '1';
      el.classList.add('lg-split');

      var words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach(function (word, i) {
        var outer = document.createElement('span');
        var inner = document.createElement('i');
        inner.textContent = word;
        inner.style.setProperty('--lg-delay', i * 70 + 'ms');
        outer.appendChild(inner);
        el.appendChild(outer);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });

      if (calm()) {
        el.classList.add('is-in');
        return;
      }
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.3 }
      ).observe(el);
    });
  }

  /* ------------------------------------------------- Halo suivant le curseur */

  function initGlass(root) {
    if (!fine.matches) return;
    each(root, '[data-lg-glass], .lg-glass', function (el) {
      if (el.dataset.lgGlassDone) return;
      el.dataset.lgGlassDone = '1';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--lg-mx', e.clientX - r.left + 'px');
        el.style.setProperty('--lg-my', e.clientY - r.top + 'px');
      });
    });
  }

  /* ------------------------------------------------------------------ Tilt */

  function initTilt(root) {
    if (!fine.matches || calm()) return;

    each(root, '[data-lg-tilt]', function (el) {
      if (el.dataset.lgTiltDone) return;
      el.dataset.lgTiltDone = '1';

      var max = parseFloat(el.getAttribute('data-lg-tilt')) || 7;
      var frame = null;

      el.addEventListener('pointermove', function (e) {
        if (frame) return;
        frame = requestAnimationFrame(function () {
          frame = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform =
            'perspective(1100px) rotateX(' +
            (-py * max).toFixed(2) +
            'deg) rotateY(' +
            (px * max).toFixed(2) +
            'deg)';
        });
      });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* -------------------------------------------------------------- Magnetic */

  function initMagnetic(root) {
    if (!fine.matches || calm()) return;

    each(root, '[data-lg-magnetic]', function (el) {
      if (el.dataset.lgMagneticDone) return;
      el.dataset.lgMagneticDone = '1';

      var pull = parseFloat(el.getAttribute('data-lg-magnetic')) || 0.28;

      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * pull;
        var dy = (e.clientY - (r.top + r.height / 2)) * pull;
        el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* -------------------------------------------------------------- Compteurs */

  function initCounters(root) {
    each(root, '[data-lg-count]', function (el) {
      if (el.dataset.lgCountDone) return;
      el.dataset.lgCountDone = '1';

      var target = parseFloat(el.getAttribute('data-lg-count'));
      if (isNaN(target)) return;
      var decimals = (el.getAttribute('data-lg-count').split('.')[1] || '').length;

      if (calm()) {
        el.textContent = target.toFixed(decimals);
        return;
      }

      el.textContent = (0).toFixed(decimals);
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            obs.unobserve(entry.target);

            var start = performance.now();
            var dur = 1400;
            (function tick(now) {
              var t = Math.min((now - start) / dur, 1);
              // sortie cubique : rapide au début, posé à l'arrivée
              var eased = 1 - Math.pow(1 - t, 3);
              el.textContent = (target * eased).toFixed(decimals);
              if (t < 1) requestAnimationFrame(tick);
            })(start);
          });
        },
        { threshold: 0.6 }
      ).observe(el);
    });
  }

  /* --------------------------------------------------------------- Marquee */

  function initMarquee(root) {
    each(root, '[data-lg-marquee]', function (track) {
      if (track.dataset.lgMarqueeDone) return;
      track.dataset.lgMarqueeDone = '1';
      // La boucle CSS translate de -50% : il faut donc exactement deux copies.
      track.innerHTML += track.innerHTML;
      Array.prototype.forEach.call(track.children, function (child, i) {
        if (i >= track.children.length / 2) child.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* -------------------------------------------------------------- Parallax */

  var parallaxItems = [];

  function initParallax(root) {
    if (calm()) return;
    each(root, '[data-lg-parallax]', function (el) {
      if (el.dataset.lgParallaxDone) return;
      el.dataset.lgParallaxDone = '1';
      parallaxItems.push({
        el: el,
        rate: parseFloat(el.getAttribute('data-lg-parallax')) || 0.15,
      });
    });
  }

  /* ---------------------------------------------- Coloris d'une famille */

  function initFamilies(root) {
    each(root, '[data-lg-family]', function (card) {
      if (card.dataset.lgFamilyDone) return;
      card.dataset.lgFamilyDone = '1';

      var swatches = card.querySelectorAll('[data-lg-swatch]');
      var medias = card.querySelectorAll('[data-lg-colorway]');
      var nameEl = card.querySelector('[data-lg-name]');
      var priceEl = card.querySelector('[data-lg-price]');
      var linkEl = card.querySelector('[data-lg-href]');

      function select(index) {
        Array.prototype.forEach.call(swatches, function (s, i) {
          s.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
        Array.prototype.forEach.call(medias, function (m, i) {
          m.classList.toggle('is-active', i === index);
        });

        var chosen = swatches[index];
        if (!chosen) return;

        var accent = chosen.getAttribute('data-accent');
        if (accent) card.style.setProperty('--lg-accent', accent);
        if (nameEl && chosen.getAttribute('data-name')) {
          nameEl.textContent = chosen.getAttribute('data-name');
        }
        if (priceEl && chosen.getAttribute('data-price')) {
          priceEl.textContent = chosen.getAttribute('data-price');
        }
        if (linkEl && chosen.getAttribute('data-url')) {
          linkEl.setAttribute('href', chosen.getAttribute('data-url'));
        }
      }

      Array.prototype.forEach.call(swatches, function (swatch, i) {
        swatch.addEventListener('click', function (e) {
          e.preventDefault();
          select(i);
        });
        // Sur un pointeur fin, survoler suffit : on prévisualise sans cliquer.
        if (fine.matches) {
          swatch.addEventListener('pointerenter', function () {
            select(i);
          });
        }
      });

      select(0);
    });
  }

  /* ----------------------------------------------------------- Navigation */

  function initNavPill(root) {
    var nav = root.querySelector('[data-lg-nav]');
    if (!nav || nav.dataset.lgNavDone) return;
    nav.dataset.lgNavDone = '1';

    var pill = nav.querySelector('.lg-nav__pill');
    if (!pill) return;

    each(nav, 'a', function (link) {
      link.addEventListener('pointerenter', function () {
        pill.style.width = link.offsetWidth + 'px';
        pill.style.transform = 'translateX(' + link.offsetLeft + 'px)';
      });
    });
  }

  /* ------------------------------------------------- Défilement : en-tête,
     barre de progression, parallaxe — un seul rAF partagé.                  */

  var header = null;
  var progress = null;
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;

      if (header) header.classList.toggle('is-condensed', y > 60);

      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      }

      var vh = window.innerHeight;
      parallaxItems.forEach(function (item) {
        var r = item.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var offset = (r.top + r.height / 2 - vh / 2) * item.rate;
        item.el.style.setProperty('--lg-shift', (-offset).toFixed(1) + 'px');
        item.el.style.transform = 'translate3d(0,' + (-offset).toFixed(1) + 'px,0)';
      });
    });
  }

  /* -------------------------------------------------------- Ancres douces */

  function initAnchors(root) {
    each(root, 'a[href^="#"]', function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: calm() ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  /* ------------------------------------------------------------------ Init */

  function init(root) {
    root = root || document;
    initReveal(root);
    initSplit(root);
    initGlass(root);
    initTilt(root);
    initMagnetic(root);
    initCounters(root);
    initMarquee(root);
    initParallax(root);
    initFamilies(root);
    initNavPill(root);
    initAnchors(root);
  }

  function boot() {
    header = document.querySelector('[data-lg-header]');
    progress = document.querySelector('[data-lg-progress]');
    init(document);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // L'éditeur de thème Shopify réinjecte le HTML d'une section : on ré-arme.
  document.addEventListener('shopify:section:load', function (e) {
    init(e.target);
  });

  window.LiquidGlass = { init: init };
})();
