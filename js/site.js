(function () {
  var nav = document.getElementById("site-nav");
  var btn = document.querySelector(".menu-btn");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
  }

  var nodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && nodes.length) {
    nodes.forEach(function (n) {
      var idx = 0;
      var el = n;
      while (el.previousElementSibling) {
        el = el.previousElementSibling;
        if (el.classList && el.classList.contains("reveal")) idx += 1;
      }
      n.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
    });
    function revealInView() {
      var view = window.innerHeight || document.documentElement.clientHeight;
      nodes.forEach(function (n) {
        if (n.classList.contains("is-in")) return;
        var r = n.getBoundingClientRect();
        if (r.top < view * 0.96 && r.bottom > 0) n.classList.add("is-in");
      });
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach(function (n) { io.observe(n); });
    revealInView();
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView);
    window.addEventListener("load", revealInView);
  } else {
    nodes.forEach(function (n) { n.classList.add("is-in"); });
  }

  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var closeBtn = lb.querySelector(".lightbox-close");
    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("is-on"); });
    }
    function closeLb() {
      lb.classList.remove("is-on");
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var finish = function () {
        lb.hidden = true;
        lbImg.removeAttribute("src");
      };
      if (reduce) finish();
      else window.setTimeout(finish, 350);
    }
    document.querySelectorAll("[data-zoom]").forEach(function (el) {
      el.addEventListener("click", function () {
        openLb(el.getAttribute("data-zoom"), el.getAttribute("data-alt"));
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLb();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) closeLb();
    });
  }

  var form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-note");
      if (note) {
        note.hidden = false;
        note.textContent = "Demo only. This form does not send a message. Call 800-891-8022 or email info@tristatetooling.com.";
      }
    });
  }
})();
