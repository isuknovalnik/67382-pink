var link = document.querySelector(".main-nav__toggle");
var header = document.querySelector(".main-header");
var menu = document.querySelector(".main-nav__list");

link.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.toggle("main-nav__list--show");
  header.classList.toggle("main-header--transparent");
  if (menu.classList.contains("main-nav__list--show")) {
    link.innerHTML = '<img src="img/btn-close-menu.png" height="22" width="23" alt="close menu">';
  }
  else {
    link.innerHTML = '<img src="img/btn-open-menu.png" height="24" width="50" alt="open menu">';
  }

});

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27) {
    if (menu.classList.contains("main-nav__list--show")) {
      menu.classList.remove("main-nav__list--show");
      header.classList.add("main-header--transparent");
    link.innerHTML = '<img src="img/btn-open-menu.png" height="24" width="50" alt="open menu">';
    }
  }
});
