document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Mobile dropdown accordion (tap "Models" to reveal Males/Females on small screens)
  document.querySelectorAll('.nav-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Hero slideshow
  var slideshow = document.querySelector('.hero-slideshow');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.slide'));
    var dotsWrap = slideshow.querySelector('.slide-dots');
    var prevBtn = slideshow.querySelector('.slide-arrow.prev');
    var nextBtn = slideshow.querySelector('.slide-arrow.next');
    var current = 0;
    var timer;

    // Real width/height of each photo, in the same order as the .slide elements.
    // Update these two arrays if you add, remove, or reorder slides.
    var ratios = [1425 / 950, 1425 / 950, 1920 / 1080, 800 / 450];

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('button'));

    function updateHeight() {
      if (window.innerWidth <= 1024) {
        var w = slideshow.clientWidth;
        var ratio = ratios[current] || 1.5;
        slideshow.style.height = (w / ratio) + 'px';
      } else {
        slideshow.style.height = '';
      }
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      updateHeight();
      resetTimer();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    window.addEventListener('resize', updateHeight);

    updateHeight();
    resetTimer();
  }
});
