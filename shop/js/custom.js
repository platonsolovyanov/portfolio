//functions
const toggleActive = (button, dropdownBox) => {
  button.addEventListener("click", event => {
    event.preventDefault();
    dropdownBox.classList.toggle("active");
    window.addEventListener("click", function(event) {
      if (
        !button.contains(event.target) &&
        !dropdownBox.contains(event.target)
      ) {
        dropdownBox.classList.remove("active");
      }
    });
  });
};

// Jquery
$(".js-readmore").click(function() {
  $(this)
    .parent(".readmore-box")
    .toggleClass("more-active");
});

//swipers
var swiper = new Swiper(".swiper1", {
  pagination: {
    el: ".swiper-pagination"
  }
});

//functions-calls
toggleActive(
  document.querySelector(".js-dropdown"),
  document.querySelector(".js-dropdown-box")
);

toggleActive(
  document.querySelector(".js-cart-dropdown"),
  document.querySelector(".js-cart")
);


