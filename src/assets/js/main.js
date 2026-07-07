/* Interactions — progressive enhancement only. The page is fully
   readable without JS; this just adds the toggle, header state, reveal. */
(function () {
  "use strict";

  /* ---- Theme toggle (persists choice) -------------------- */
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      toggle.setAttribute("aria-pressed", String(next === "dark"));
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

    // A group's top measured within the scroll content — stable regardless of
    // offsetParent, and recomputed on demand so it survives resize/reflow.
    var groupTop = function (group) {
      return group.getBoundingClientRect().top
        - certScroll.getBoundingClientRect().top
        + certScroll.scrollTop;
    };

    var setActive = function (idx) {
      certPairs.forEach(function (p, i) {
        if (i === idx) p.tab.setAttribute("aria-current", "true");
        else p.tab.removeAttribute("aria-current");
      });
    };

    // The active group is the last one whose top has scrolled past the panel's
    // top edge (+ a small threshold so a header counts once it's pinned).
    var spy = function () {
      // At the bottom, the final groups may be too short to ever reach the top
      // edge — but reaching the bottom means you've arrived at the last one, so
      // activate it outright instead of leaving an earlier group highlighted.
      if (certScroll.scrollTop + certScroll.clientHeight >= certScroll.scrollHeight - 4) {
        setActive(certPairs.length - 1);
        return;
      }
      var pos = certScroll.scrollTop + 12;
      var active = 0;
      certPairs.forEach(function (p, i) {
        if (groupTop(p.group) <= pos) active = i;
      });
      setActive(active);
    };

    certPairs.forEach(function (p, i) {
      p.tab.addEventListener("click", function () {
        setActive(i);                          // immediate feedback, don't wait for scroll
        certScroll.scrollTo({ top: Math.max(0, groupTop(p.group) - 4) });
      });
    });

    var spyPending = false;
    certScroll.addEventListener("scroll", function () {
      if (spyPending) return;
      spyPending = true;
      window.requestAnimationFrame(function () { spyPending = false; spy(); });
    }, { passive: true });
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
