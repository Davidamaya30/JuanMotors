(function () {
  "use strict";

  var toggle = document.getElementById("sidebar-toggle");
  var menuLabel = document.getElementById("menu-label");
  var collapseLabel = document.getElementById("collapse-label");
  var navLinks = document.querySelectorAll("[data-nav]");
  var mobileQuery = window.matchMedia("(max-width: 1024px)");
  function syncAria() {
    var open = toggle.checked;
    var isMobile = mobileQuery.matches;
    menuLabel.setAttribute("aria-expanded", isMobile ? String(open) : "false");
    collapseLabel.setAttribute("aria-expanded", isMobile ? "true" : String(!open));
  }

  toggle.addEventListener("change", syncAria);
  mobileQuery.addEventListener("change", syncAria);
  syncAria();
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (l) {
        l.classList.remove("is-active");
        l.removeAttribute("aria-current");
      });
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");

      if (mobileQuery.matches) {
        toggle.checked = false;
        syncAria();
      }
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.checked && mobileQuery.matches) {
      toggle.checked = false;
      syncAria();
      menuLabel.focus();
    }
  });
})();
