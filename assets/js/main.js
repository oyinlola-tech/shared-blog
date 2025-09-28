// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  var articlesContainer = document.getElementById('articlesContainer');
  var filterButtons = document.querySelectorAll('.category-btn'); // filter buttons
  var navLinks = document.querySelectorAll('.nav-links a'); // anchors in nav (used for active highlight)
  var hamburger = document.getElementById('hamburger');
  var navLinksList = document.querySelector('.nav-links');

  function filterCategory(cat) {
    if (!articlesContainer) return;
    var cards = articlesContainer.querySelectorAll('.card');
    cards.forEach(function (c) {
      if (cat === 'all') {
        c.style.display = '';
      } else {
        if (c.classList.contains(cat)) c.style.display = '';
        else c.style.display = 'none';
      }
    });

    // update active state on nav links (visual only)
    navLinks.forEach(function (a) {
      if (a.dataset && a.dataset.cat === cat) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  // wire up filter buttons (prevent navigation — they are buttons)
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var cat = btn.getAttribute('data-cat') || 'all';
      filterCategory(cat);
      // close mobile nav if open
      if (navLinksList && window.innerWidth <= 680) {
        navLinksList.style.display = 'none';
      }
    });
  });

  // hamburger toggles nav-links (mobile)
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', function () {
      var cur = window.getComputedStyle(navLinksList).display;
      navLinksList.style.display = (cur === 'block' || cur === 'flex') ? 'none' : 'block';
      // basic inline-styling for mobile dropdown
      if (navLinksList.style.display === 'block') {
        navLinksList.style.position = 'absolute';
        navLinksList.style.top = (hamburger.getBoundingClientRect().bottom + 8) + 'px';
        navLinksList.style.right = '14px';
        navLinksList.style.background = 'rgba(15,33,52,0.95)';
        navLinksList.style.padding = '10px';
        navLinksList.style.borderRadius = '10px';
        navLinksList.style.zIndex = 120;
      } else {
        navLinksList.style.position = '';
        navLinksList.style.top = '';
        navLinksList.style.right = '';
        navLinksList.style.background = '';
        navLinksList.style.padding = '';
        navLinksList.style.borderRadius = '';
        navLinksList.style.zIndex = '';
      }
    });
  }

  // initial state: show all
  filterCategory('all');
});