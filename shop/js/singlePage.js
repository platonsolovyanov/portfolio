const select = (select, dropdown, choses, option) => {
    select.addEventListener("click", event => {
      event.preventDefault();
      dropdown.classList.toggle("active");
      window.addEventListener("click", event => {
        if (!select.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.classList.remove("active");
        }
      });
    });
    for (let chose of choses) {
      chose.addEventListener("click", event => {
        event.preventDefault();
        select.innerHTML = chose.innerHTML;
        dropdown.classList.toggle("active");
        option.value = chose.getAttribute("data-id");
      });
    }
  };
  var swiper = new Swiper(".swiper2", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
  select(
    document.querySelector(".js-sorting-dropdown-select1"),
    document.querySelector(".js-sorting-dropdown1"),
    document.querySelectorAll(".js-sorting-dropdown-item-link1"),
    document.getElementsByName("js-sorting-select1")
  );
  select(
    document.querySelector(".js-sorting-dropdown-select2"),
    document.querySelector(".js-sorting-dropdown2"),
    document.querySelectorAll(".js-sorting-dropdown-item-link2"),
    document.getElementsByName("js-sorting-select2")
  );