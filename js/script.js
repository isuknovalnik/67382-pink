var link = document.querySelector(".main-nav__toggle");
var header = document.querySelector(".main-header");
var headerWrap = document.querySelector(".main-header-wrap");
var menu = document.querySelector(".main-nav__list");

link.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.toggle("main-nav__list--show");
  header.classList.toggle("main-header--transparent");
  headerWrap.classList.toggle("main-header-wrap--transparent");
  if (menu.classList.contains("main-nav__list--show")) {
    link.classList.remove("main-nav__toggle--open");
    link.classList.add("main-nav__toggle--close");
  }
  else {
    link.classList.remove("main-nav__toggle--close");
    link.classList.add("main-nav__toggle--open");
  }

});

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27) {
    if (menu.classList.contains("main-nav__list--show")) {
      menu.classList.remove("main-nav__list--show");
      header.classList.add("main-header--transparent");
      headerWrap.classList.toggle("main-header-wrap--transparent");
      link.classList.remove("main-nav__toggle--close");
      link.classList.add("main-nav__toggle--open");
    }
  }
});
