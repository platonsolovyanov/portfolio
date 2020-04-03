const fromInput = document.querySelector(".js-from"),
  toInput = document.querySelector(".js-to"),
  products = document.querySelectorAll(".product");

$(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 800,
  from: 0,
  to: 800,
  hide_from_to: true,
  hide_min_max: true,
  onChange: function(data) {
    fromInput.value = data.from;
    toInput.value = data.to;
    changedPriceHandler();
  }
});

function changedPriceHandler() {
  const fromPrice = fromInput.value;
  const toPrice = toInput.value;

  if (fromPrice !== "0" && toPrice === "1000") {
    showProductsWithFromPrice();
  } else if (fromPrice === "0" && toPrice !== "1000") {
    showProductsWithToPrice();
  } else if (fromPrice !== "0" && toPrice !== "1000") {
    showProductsWithBothPrices();
  }
}
/** Показывает продукты с диапазоном цен "от". */
function showProductsWithFromPrice() {
  const fromPrice = Number(fromInput.value);
  products.forEach(function(product) {
    const productPrice = Number(
      product.querySelector(".price").textContent.trim()
    );
    if (productPrice < fromPrice) {
      hideProduct(product);
    } else {
      showProduct(product);
    }
  });
}

/** Показывает продукты с диапазоном цен "до". */
function showProductsWithToPrice() {
  const toPrice = Number(toInput.value);
  products.forEach(function(product) {
    const productPrice = Number(
      product.querySelector(".price").textContent.trim()
    );
    if (productPrice > toPrice) {
      hideProduct(product);
    } else {
      showProduct(product);
    }
  });
}

/** Показывает продукты с обеими диапазонами. */
function showProductsWithBothPrices() {
  const fromPrice = Number(fromInput.value);
  const toPrice = Number(toInput.value);
  products.forEach(function(product) {
    const productPrice = Number(
      product.querySelector(".price").textContent.trim()
    );
    if (productPrice >= fromPrice && productPrice <= toPrice) {
      showProduct(product);
    } else {
      hideProduct(product);
    }
  });
}

function hideProduct(product) {
  product.style.display = "none";
}

function showProduct(product) {
  product.style.display = "block";
}

function isProductHidden(product) {
  return product.style.display === "none";
}

