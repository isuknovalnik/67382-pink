var link = document.querySelector(".main-nav__toggle");
var header = document.querySelector(".main-header");
var menu = document.querySelector(".main-nav__list");
var form = document.querySelector(".contest-form");
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
      if (daysCounter > 110) {
       daysCounter = 110;
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
    } else if (daysCounter > 110) {
            daysCounter = 110;
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
  var area = form.querySelector(".contest-form__add-items-area");
  var template = document.querySelector("#add-people-template").innerHTML;

  peopleIncr.addEventListener("click", function(event) {
    event.preventDefault();
    peopleCounter++;

    if (peopleCounter > 10) {
      peopleCounter = 10;
    } else {
      addPerson(peopleCounter);
    }

    peopleNumber.value = peopleCounter + " чел";

  });

  peopleDecr.addEventListener("click", function(event) {
    event.preventDefault();
    peopleCounter--;
    if (peopleCounter < 0) {
       peopleCounter = 0;
    } else {
      delPerson ();
    }

    peopleNumber.value = peopleCounter + " чел";

  });

  peopleNumber.addEventListener("change", function(event) {
    event.preventDefault();
    peopleCounter = parseInt(peopleNumber.value, 10);
    if ((!peopleCounter) || (peopleCounter < 0)) {
      peopleCounter = 0;
    } else if (peopleCounter > 10) {
            peopleCounter = 10;
    }

    peopleNumber.value = peopleCounter + " чел";
});
  

  function addPerson(counter) {

    var html = Mustache.render(template, {
      "personNumber": String(counter)
    });
    area.innerHTML = area.innerHTML + html;
  
  }
  
  function delPerson() {
    var lastPerson = area.lastElementChild;
    area.removeChild(lastPerson);
  }

}

// Отправка формы
if (form) {
  var areaPics = form.querySelector(".photo-previews");
  var templatePics = document.querySelector("#image-template").innerHTML;
  var queue = [];

  (function() {

    if (!("FormData" in window)) {
      return;
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      var data = new FormData(form);

     queue.forEach(function(element) {
       data.append("add-photo", element.file);
     });
      
      request(data, function(response) {
        console.log(response);
      });

      function request(data, fn) {

        var xhr = new XMLHttpRequest();
        var time = (new Date()).getTime();
        xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

        xhr.addEventListener("readystatechange", function() {
          if (xhr.readyState == 4) {
            console.log(xhr.responseText);
          }
        });
        xhr.send(data);
      }
    });

  })();

  // Загрузка картинок

  (function() {
    if (!("FormData" in window)) {
      return;
    }

    form.querySelector("#add-photo").addEventListener("change", function() {
      var files = this.files;

      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });

    function preview(file) {
      if ("FileReader" in window) {

        if (file.type.match(/image.*/)) {
          var reader = new FileReader();

          reader.addEventListener("load", function(event) {
            var html = Mustache.render(templatePics, {
              "image": event.target.result,
              "name": file.name
            });

            var figure = document.createElement("figure");
            figure.classList.add("image-preview");
            figure.innerHTML = html;

            areaPics.appendChild(figure);
            
            figure.querySelector(".image-preview__close-link").addEventListener("click", function(event) {
              event.preventDefault();
              removePreview(figure);
            });

            queue.push({
              "file": file,
              "figure": figure
            });
            
          });

          reader.readAsDataURL(file);
        }
      }
    }
    
    function removePreview(figure) {
      queue = queue.filter(function(element) {
        return element.figure != figure;
      });
      figure.parentNode.removeChild(figure);
    }
    
  })();

}