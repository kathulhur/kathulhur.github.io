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
    var updateActive = function () {
      activeIndex = findActive();
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === activeIndex);
      });
      // Ends key off which project is active, not raw scroll position: the
      // trailing spacer means the scrollbar never reaches its literal end.
      var atStart = activeIndex === 0;
      var atEnd = activeIndex === lastIndex;
      prev.disabled = atStart;
      next.disabled = atEnd;
      track.setAttribute("data-at-start", String(atStart));
      track.setAttribute("data-at-end", String(atEnd));
    };

    // Bring a given slide's left edge to the track's left edge.
    var scrollToSlide = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      var delta = slides[i].getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollBy({ left: delta, behavior: "smooth" });
    };
    prev.addEventListener("click", function () { scrollToSlide(activeIndex - 1); });
    next.addEventListener("click", function () { scrollToSlide(activeIndex + 1); });

    updateActive();
    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(updateActive);
    }, { passive: true });
    window.addEventListener("resize", updateActive);
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
