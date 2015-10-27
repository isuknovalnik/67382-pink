var link = document.querySelector(".main-nav__toggle");
var header = document.querySelector(".main-header");
var menu = document.querySelector(".main-nav__list");
var daysNumber = document.querySelector("#travel-days");
var daysDecr = document.querySelector(".decrease-days");
var daysIncr = document.querySelector(".increase-days");

var peopleNumber = document.querySelector("#companions");
var peopleDecr = document.querySelector(".decrease-people");
var peopleIncr = document.querySelector(".increase-people");

// Гамбургер

link.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.toggle("main-nav__list--show");
  header.classList.toggle("main-header--transparent");
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
      link.classList.remove("main-nav__toggle--close");
      link.classList.add("main-nav__toggle--open");
    }
  }
});

// Количество дней
if (daysNumber) {
  var daysCounter = parseInt(daysNumber.value, 10);


  daysIncr.addEventListener("click", function(event) {
    event.preventDefault();
    daysCounter++;
      if (daysCounter > 999) {
       daysCounter = 999;
      }
    daysNumber.value = daysCounter + " " + daysTail(daysCounter);

  });

  daysDecr.addEventListener("click", function(event) {
    event.preventDefault();
    daysCounter--;
    if (daysCounter < 0) {
       daysCounter = 0;
    }

    daysNumber.value = daysCounter + " " + daysTail(daysCounter);

  });

  daysNumber.addEventListener("change", function(event) {
    event.preventDefault();
    daysCounter = parseInt(daysNumber.value, 10);
    if ((!daysCounter) || (daysCounter < 0)) {
      daysCounter = 0;
    } else if (daysCounter > 999) {
            daysCounter = 999;
    }

    daysNumber.value = daysCounter + " " + daysTail(daysCounter);
  });

  function daysTail (counter) {
    if ((counter > 10) && (counter < 20)) {
      return("дней");
    }
    var strCounter = String(counter);
    var lastDigit = strCounter[strCounter.length-1];
    switch (lastDigit) {
      case "1":
        return("день");
        break;
      case "2":
      case "3":
      case "4":
        return("дня");
        break;
      default:
        return("дней");
    }

  }
}
// Количество попутчиков
if (peopleNumber) {
  var peopleCounter = parseInt(peopleNumber.value, 10);

  peopleIncr.addEventListener("click", function(event) {
    event.preventDefault();
    peopleCounter++;
      if (peopleCounter > 99) {
       peopleCounter = 99;
      }
    peopleNumber.value = peopleCounter + " чел";

  });

  peopleDecr.addEventListener("click", function(event) {
    event.preventDefault();
    peopleCounter--;
    if (peopleCounter < 0) {
       peopleCounter = 0;
    }

    peopleNumber.value = peopleCounter + " чел";

  });

  peopleNumber.addEventListener("change", function(event) {
    event.preventDefault();
    peopleCounter = parseInt(peopleNumber.value, 10);
    if ((!peopleCounter) || (peopleCounter < 0)) {
      peopleCounter = 0;
    } else if (peopleCounter > 99) {
            peopleCounter = 99;
    }

    peopleNumber.value = peopleCounter + " чел";
});

}