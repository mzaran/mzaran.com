(function () {
  var header = document.querySelector('[data-scroll]');
  if (!header) return;

  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > 60) {
          if (y > lastY) {
            header.classList.add('header-hidden');
          } else {
            header.classList.remove('header-hidden');
          }
        } else {
          header.classList.remove('header-hidden');
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
