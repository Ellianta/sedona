var form = document.querySelector(".search-form");
var link = document.querySelector(".search-hotel__form-title");

link.addEventListener("click", function(event){
  event.preventDefault();
  form.classList.add("search-form--show");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (form.classList.contains("search-form--show")) {
        form.classList.remove("search-form--show");
    }
  }
});
