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

  /* ---- Horizontal work scroller (prev/next + end states) - */
  var track = document.querySelector(".work-track");
  var prev = document.querySelector('[data-scroll="prev"]');
  var next = document.querySelector('[data-scroll="next"]');
  if (track && prev && next) {
    var stepSize = function () {
      var slide = track.querySelector(".work-slide");
      return slide ? slide.getBoundingClientRect().width + 1 : track.clientWidth * 0.8;
    };
    prev.addEventListener("click", function () {
      track.scrollBy({ left: -stepSize(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      track.scrollBy({ left: stepSize(), behavior: "smooth" });
    });
    var syncEnds = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= max;
      prev.disabled = atStart;
      next.disabled = atEnd;
      track.setAttribute("data-at-start", String(atStart));
      track.setAttribute("data-at-end", String(atEnd));
    };
    syncEnds();
    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(syncEnds);
    }, { passive: true });
    window.addEventListener("resize", syncEnds);
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
