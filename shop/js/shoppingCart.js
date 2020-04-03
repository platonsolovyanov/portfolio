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
  select(
    document.querySelector(".js-sorting-dropdown-select3"),
    document.querySelector(".js-sorting-dropdown3"),
    document.querySelectorAll(".js-sorting-dropdown-item-link3"),
    document.getElementsByName("js-sorting-select3")
  );