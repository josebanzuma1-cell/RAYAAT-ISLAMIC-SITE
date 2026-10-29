/* =============================================================
   Raayat Islamic Nursery & Primary School — site behaviour
   ============================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- footer year ---------------------------------- */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- mobile navigation ---------------------------- */
  var nav = $('#nav'), navToggle = $('#navToggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__links a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- reveal on scroll ----------------------------- */
  var reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- programme tabs ------------------------------- */
  var tabs = $$('.prog__tab');
  if (tabs.length) {
    var panels = $$('.prog__panel');
    var current = 0;

    function showLevel(i) {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, n) {
        var on = n === current;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach(function (p, n) {
        var on = n === current;
        p.classList.toggle('is-active', on);
        if (on) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
      });
    }

    tabs.forEach(function (t, n) { t.addEventListener('click', function () { showLevel(n); }); });
    var pPrev = $('#progPrev'), pNext = $('#progNext');
    if (pPrev) pPrev.addEventListener('click', function () { showLevel(current - 1); });
    if (pNext) pNext.addEventListener('click', function () { showLevel(current + 1); });
    showLevel(0);
  }

  /* ---------- academic calendar ----------------------------
     Uganda runs three school terms a year. Exact opening and
     closing dates are set by the Ministry of Education and
     Sports and change from year to year, so the shading below
     marks the usual term window rather than confirmed dates.

     TO UPDATE: edit TERMS (term windows, used for shading) and
     MILESTONES (the "key dates" list, keyed by month index
     0 = January ... 11 = December).
     --------------------------------------------------------- */
  var calGrid = $('#calGrid');
  if (calGrid) {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // term windows as [startMonthIndex, startDay, endMonthIndex, endDay]
    var TERMS = [
      { name: 'Term One',   from: [1, 1],  to: [4, 2]  },
      { name: 'Term Two',   from: [4, 25], to: [7, 15] },
      { name: 'Term Three', from: [8, 14], to: [11, 5] }
    ];

    var MILESTONES = {
      0:  ['School office reopens for enquiries and registration',
           'New pupils collect uniform and requirement lists'],
      1:  ['Term One begins — all classes report (early February)',
           'Orientation week for new Nursery pupils'],
      2:  ['Term One mid-term break (mid March)',
           'Continuous assessment for all classes'],
      3:  ['Parents’ day and report collection (April)',
           'Qur’an recitation showcase'],
      4:  ['Term One ends (early May)',
           'Term Two begins (late May)'],
      5:  ['Continuous assessment and class projects',
           'Islamic Studies open day'],
      6:  ['Term Two mid-term break (July)',
           'P.7 candidate revision intensifies'],
      7:  ['Term Two ends (mid August)',
           'Reports issued to parents'],
      8:  ['Term Three begins (mid September)',
           'Final registration for the coming year opens'],
      9:  ['Independence Day — public holiday (9 October)',
           'P.7 mock examinations'],
      10: ['Primary Leaving Examinations for P.7 (November)',
           'Parents’ day and prize giving'],
      11: ['Term Three ends (early December)',
           'End of year closing and reports']
    };

    var today = new Date();
    var YEAR = today.getFullYear();
    var view = today.getMonth();

    function inTerm(m, d) {
      for (var i = 0; i < TERMS.length; i++) {
        var t = TERMS[i];
        var a = t.from[0] * 100 + t.from[1];
        var b = t.to[0]   * 100 + t.to[1];
        var v = m * 100 + d;
        if (v >= a && v <= b) return t.name;
      }
      return null;
    }

    function renderMonths() {
      var host = $('#calMonths');
      if (!host) return;
      host.innerHTML = '';
      MONTHS.forEach(function (name, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = name;
        b.className = i === view ? 'is-active' : '';
        b.addEventListener('click', function () { view = i; render(); });
        host.appendChild(b);
      });
    }

    function render() {
      $('#calTitle').textContent = MONTHS[view] + ' ' + YEAR;

      calGrid.innerHTML = '';
      DOW.forEach(function (d) {
        var h = document.createElement('div');
        h.className = 'cal__dow';
        h.textContent = d;
        calGrid.appendChild(h);
      });

      var first = new Date(YEAR, view, 1).getDay();
      var days  = new Date(YEAR, view + 1, 0).getDate();
      var prevDays = new Date(YEAR, view, 0).getDate();

      for (var i = first - 1; i >= 0; i--) {
        calGrid.appendChild(cell(prevDays - i, 'is-muted'));
      }
      for (var d = 1; d <= days; d++) {
        var cls = '';
        var term = inTerm(view, d);
        if (term) cls = 'is-event';
        if (d === today.getDate() && view === today.getMonth() && YEAR === today.getFullYear()) {
          cls = 'is-today';
        }
        calGrid.appendChild(cell(d, cls, term));
      }
      var filled = first + days;
      var tail = (7 - (filled % 7)) % 7;
      for (var n = 1; n <= tail; n++) calGrid.appendChild(cell(n, 'is-muted'));

      // side panel
      var side = $('#calEvents');
      var list = MILESTONES[view] || [];
      side.innerHTML = '';
      if (!list.length) {
        var li = document.createElement('li');
        li.className = 'cal__empty';
        li.textContent = 'No school events listed for this month.';
        side.appendChild(li);
      } else {
        list.forEach(function (txt) {
          var li = document.createElement('li');
          li.textContent = txt;
          side.appendChild(li);
        });
      }
      $('#calSideTitle').textContent = MONTHS[view] + ' — key dates';
      renderMonths();
    }

    function cell(n, cls, term) {
      var el = document.createElement('div');
      el.className = 'cal__day ' + (cls || '');
      el.textContent = n;
      el.setAttribute('role', 'gridcell');
      if (term) el.title = term + ' in session';
      return el;
    }

    var cPrev = $('#calPrev'), cNext = $('#calNext');
    if (cPrev) cPrev.addEventListener('click', function () { view = (view + 11) % 12; render(); });
    if (cNext) cNext.addEventListener('click', function () { view = (view + 1) % 12; render(); });
    render();
  }

  /* ---------- promises carousel ---------------------------- */
  var slides = $$('.pledge__slide');
  if (slides.length) {
    var dots = $('#pledgeDots');
    var idx = 0, timer = null;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === idx); });
      $$('button', dots).forEach(function (b, n) {
        b.classList.toggle('is-active', n === idx);
        b.setAttribute('aria-selected', String(n === idx));
      });
    }

    slides.forEach(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Promise ' + (n + 1));
      b.addEventListener('click', function () { show(n); restart(); });
      dots.appendChild(b);
    });

    function restart() {
      if (timer) clearInterval(timer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(function () { show(idx + 1); }, 7000);
    }

    show(0);
    restart();
  }

  /* ---------- newsletter (front-end only) ------------------ */
  var newsForm = $('#newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#newsEmail'), msg = $('#newsMsg');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      msg.textContent = ok
        ? 'Thank you — please also send your name to raayatislamicschool02@gmail.com so we can add you.'
        : 'Please enter a valid email address.';
      msg.style.color = ok ? '#6FE3A6' : '#FF9AA0';
      if (ok) input.value = '';
    });
  }

  /* ---------- the school's contact points ------------------
     Change these in one place and the whole site follows.

     whatsapp — international format, no "+" and no spaces.
     The office line 0704 178474 is a Ugandan number (+256), so
     the leading 0 is dropped and 256 goes in front.
     --------------------------------------------------------- */
  var SCHOOL = {
    email: 'raayatislamicschool02@gmail.com',
    whatsapp: '256704178474'
  };

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12.04 2.02a9.9 9.9 0 0 0-8.5 14.93L2 22.1l5.3-1.39a9.9 9.9 0 1 0 4.74-18.69Zm0 1.8a8.1 8.1 0 1 1-4.1 15.08l-.3-.18-3.14.83.84-3.06-.2-.31A8.1 8.1 0 0 1 12.04 3.82Zm4.63 10.5c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.65.8-.8.97-.14.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.5.11-.12.25-.3.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.59.13.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z"/></svg>';

  function waLink(text) {
    return 'https://wa.me/' + SCHOOL.whatsapp + '?text=' + encodeURIComponent(text);
  }

  /* ---------- floating WhatsApp button, every page ---------- */
  if (!document.querySelector('.wa-fab')) {
    var fab = document.createElement('a');
    fab.className = 'wa-fab';
    fab.href = waLink('Hello Raayat Islamic Nursery & Primary School, I would like to make an enquiry.');
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Chat with the school office on WhatsApp');
    fab.innerHTML = WA_ICON + '<span>Chat on WhatsApp</span>';
    document.body.appendChild(fab);
  }

  /* ---------- enquiry form -> WhatsApp ---------------------
     Every enquiry is pushed to the school's WhatsApp. The fields
     are folded into one tidy message and wa.me is opened with it
     already typed; the parent presses send in WhatsApp itself,
     which is the only thing wa.me permits — no message can be
     sent on somebody's behalf without them seeing it.
     --------------------------------------------------------- */
  var contactForm = $('#contactForm');
  if (contactForm) {
    var msg = $('#contactMsg');

    var say = function (text, state) {
      msg.textContent = text;
      msg.className = 'form__msg' + (state ? ' is-' + state : '');
    };

    var read = function (data, key) {
      return (data.get(key) || '').toString().trim();
    };

    var compose = function (data) {
      var lines = ['*New enquiry from the website*', ''];
      lines.push('Name: ' + read(data, 'name'));
      lines.push('Class of interest: ' + (read(data, 'level') || 'Not given'));
      if (read(data, 'phone')) lines.push('Phone: ' + read(data, 'phone'));
      if (read(data, 'email')) lines.push('Email: ' + read(data, 'email'));
      lines.push('', read(data, 'message'));
      return lines.join('\n');
    };

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(contactForm);
      if (read(data, '_honey')) return;           // silently drop bots

      var name  = read(data, 'name');
      var email = read(data, 'email');
      var body  = read(data, 'message');

      if (!name || !body) {
        say('Please fill in your name and your message.', 'err');
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say('That email address does not look right — correct it, or leave it blank.', 'err');
        return;
      }

      var url = waLink(compose(data));
      var opened = window.open(url, '_blank', 'noopener');

      if (opened) {
        say('WhatsApp is opening with your enquiry ready — press send there and it reaches '
          + 'the school office on 0704 178474.', 'ok');
      } else {
        // pop-up blocked: hand this tab over to WhatsApp instead
        say('Opening WhatsApp…', 'busy');
        window.location.href = url;
      }
    });
  }
})();
