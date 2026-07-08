/* Interactions — progressive enhancement only. The page is fully
   readable without JS; this just adds the toggle, header state, reveal. */
(function () {
  "use strict";

  /* ---- Theme toggle (persists choice) -------------------- */
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(next) {
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    toggle.setAttribute("aria-pressed", String(next === "dark"));
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";

      // Reveal the new palette with a circular wipe radiating from the
      // toggle (View Transitions API). Older browsers and reduced-motion
      // users just swap — the body's background/color still crossfades.
      if (!document.startViewTransition || prefersReducedMotion.matches) {
        applyTheme(next);
        return;
      }

      var rect = toggle.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.startViewTransition(function () { applyTheme(next); })
        .ready.then(function () {
          root.animate(
            { clipPath: [
                "circle(0px at " + x + "px " + y + "px)",
                "circle(" + endRadius + "px at " + x + "px " + y + "px)"
              ] },
            { duration: 480, easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)" }
          );
        });
    });
  }

  /* ---- Header hairline appears after scroll -------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", String(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Horizontal work scroller ---------------------------
     Position-driven emphasis: whichever project sits nearest the
     track's left edge is the "active" one — it expands; the rest
     collapse to slim peeks. Scrolling moves the emphasis along, and
     a trailing spacer lets even the last project reach the left. */
  var track = document.querySelector(".work-track");
  var prev = document.querySelector('[data-scroll="prev"]');
  var next = document.querySelector('[data-scroll="next"]');
  if (track && prev && next) {
    var slides = Array.prototype.slice.call(track.querySelectorAll(".work-slide"));

    // Opt in to the collapse/expand behavior only once JS is running, so
    // the no-JS page keeps every project fully readable.
    track.classList.add("is-enhanced");

    var activeIndex = 0;
    var findActive = function () {
      var edge = track.getBoundingClientRect().left;
      var best = 0, bestDist = Infinity;
      slides.forEach(function (s, i) {
        var dist = Math.abs(s.getBoundingClientRect().left - edge);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };
    var lastIndex = slides.length - 1;
    // Apply a given index as the emphasized project — toggles widths and keeps
    // the controls/edge-fades in sync. Shared by scroll tracking and the buttons.
    var applyActive = function (idx) {
      activeIndex = idx;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === idx);
      });
      // Ends key off which project is active, not raw scroll position: the
      // trailing spacer means the scrollbar never reaches its literal end.
      var atStart = idx === 0;
      var atEnd = idx === lastIndex;
      prev.disabled = atStart;
      next.disabled = atEnd;
      track.setAttribute("data-at-start", String(atStart));
      track.setAttribute("data-at-end", String(atEnd));
    };
    var updateActive = function () { applyActive(findActive()); };

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bring a given slide's left edge to the track's left edge — seamlessly.
    // The destination is a moving target: as it scrolls into focus it expands
    // while the old active slide collapses, shifting every position, and
    // mandatory snap keeps re-aligning to snap points that are themselves
    // moving (that combination overshot and snapped back before).
    //
    // We compute the final resting scrollLeft ANALYTICALLY rather than by
    // toggling classes to measure it: between now and the final layout the only
    // width that changes is the currently-active slide collapsing to a peek, so
    // if it sits before the target, the target shifts left by exactly that much.
    // Measuring by class-toggling would need a transitions-off freeze, and that
    // freeze is what made the widths snap instantly instead of animate (the
    // "anchored" look). With no freeze, applyActive() animates the widths
    // naturally from the live state while the track glides to the fixed target —
    // the incoming card grows as it slides to the edge, one motion.
    var navTimer = null;
    var endNav = function () {
      track.removeEventListener("scrollend", endNav);
      clearTimeout(navTimer);
      track.classList.remove("is-navigating");
      updateActive();
    };
    var scrollToSlide = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));

      var trackLeft = track.getBoundingClientRect().left;
      var wActive = slides[activeIndex].getBoundingClientRect().width;
      var wPeek = slides[activeIndex === 0 ? 1 : 0].getBoundingClientRect().width;
      // slide i's current left within the scroll content …
      var curLeft = slides[i].getBoundingClientRect().left - trackLeft + track.scrollLeft;
      // … minus the collapse of the active slide when it sits ahead of the target.
      var target = curLeft - (activeIndex < i ? wActive - wPeek : 0);

      track.classList.add("is-navigating");    // snap off; scroll handler stands down
      applyActive(i);                          // widths animate from the live state
      track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });

      // Restore snap + tracking once the glide lands. Prefer the precise
      // scrollend event; fall back to a timeout where it isn't supported.
      clearTimeout(navTimer);
      if ("onscrollend" in window) {
        track.removeEventListener("scrollend", endNav);
        track.addEventListener("scrollend", endNav);
        navTimer = setTimeout(endNav, 900);    // safety net
      } else {
        navTimer = setTimeout(endNav, 620);
      }
    };
    prev.addEventListener("click", function () { scrollToSlide(activeIndex - 1); });
    next.addEventListener("click", function () { scrollToSlide(activeIndex + 1); });

    // Click a peek to promote it — no need to reach for the arrows. Only the
    // active slide follows its (stretched) link; clicking any collapsed slide
    // instead brings it to the emphasized position. Enter on a peek's link
    // fires a click here too, so keyboard promotion comes for free.
    slides.forEach(function (s, i) {
      s.addEventListener("click", function (e) {
        if (s.classList.contains("is-active")) return;   // active: let the link open
        e.preventDefault();
        scrollToSlide(i);
      });
    });

    updateActive();
    track.addEventListener("scroll", function () {
      // A button jump drives the emphasis itself; don't let free-scroll tracking
      // fight it mid-flight (that reintroduces the overshoot we just removed).
      if (track.classList.contains("is-navigating")) return;
      window.requestAnimationFrame(updateActive);
    }, { passive: true });
    window.addEventListener("resize", updateActive);
  }

  /* ---- Certificate category tabs (scrollspy) --------------
     The panel scrolls internally; the tab rail makes that obvious and
     doubles as navigation. Clicking a tab scrolls its group to the top of
     the panel; free-scrolling highlights whichever group you've reached. */
  var certScroll = document.querySelector(".certs-scroll");
  var certTabs = Array.prototype.slice.call(document.querySelectorAll(".cert-tab"));
  if (certScroll && certTabs.length) {
    // Pair each tab with its target group, keeping only pairs that resolve.
    var certPairs = certTabs.map(function (tab) {
      return { tab: tab, group: document.getElementById(tab.getAttribute("data-cert-tab")) };
    }).filter(function (p) { return p.group; });

    // Entries begin PAD below the panel's top edge (the panel's top padding);
    // that line is where a group's first row "touches" the tab rail.
    var PAD = 12;

    // A group's top measured within the scroll content — stable regardless of
    // offsetParent, and recomputed on demand so it survives resize/reflow.
    var groupTop = function (group) {
      return group.getBoundingClientRect().top
        - certScroll.getBoundingClientRect().top
        + certScroll.scrollTop;
    };

    // Pad the panel's end so even the short trailing groups can be scrolled
    // until their first row reaches the top edge (otherwise they pile against
    // the bottom and their tab never lights). Room needed = a viewport minus
    // the last group's own height; recomputed on resize since the 2→1 column
    // switch changes group heights.
    var padTail = function () {
      var last = certPairs[certPairs.length - 1].group;
      var room = certScroll.clientHeight - last.offsetHeight - PAD;
      certScroll.style.paddingBottom = Math.max(room, PAD) + "px";
    };

    var setActive = function (idx) {
      certPairs.forEach(function (p, i) {
        if (i === idx) p.tab.setAttribute("aria-current", "true");
        else p.tab.removeAttribute("aria-current");
      });
    };

    // A group is active once its first row has reached the top edge — i.e. its
    // top touches the tab rail. The last group to have crossed that line wins.
    var spy = function () {
      var line = certScroll.scrollTop + PAD;
      var active = 0;
      certPairs.forEach(function (p, i) {
        if (groupTop(p.group) <= line) active = i;
      });
      // Subpixel scrollHeight can stop a hair short; the physical bottom means
      // you've arrived at the last group.
      if (certScroll.scrollTop >= certScroll.scrollHeight - certScroll.clientHeight - 1)
        active = certPairs.length - 1;
      setActive(active);
    };

    certPairs.forEach(function (p, i) {
      p.tab.addEventListener("click", function () {
        setActive(i);                          // immediate feedback, don't wait for scroll
        certScroll.scrollTo({ top: Math.max(0, groupTop(p.group) - PAD) });
      });
    });

    var spyPending = false;
    certScroll.addEventListener("scroll", function () {
      if (spyPending) return;
      spyPending = true;
      window.requestAnimationFrame(function () { spyPending = false; spy(); });
    }, { passive: true });
    window.addEventListener("resize", function () { padTail(); spy(); });
    padTail();
    spy();
  }

  /* ---- Reveal on scroll ---------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
