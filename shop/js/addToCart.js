let basketBtns = document.querySelectorAll(".add-to-card");
//берем все кнопки "В корзину" и слушаем клики по ним
basketBtns.forEach(function(btn) {
  btn.addEventListener("click", function(event) {
    event.preventDefault();
    let productNode = this.parentNode.parentNode;
    let id = productNode.dataset.id;
    let img = productNode.querySelector(".img").src;
    let price = productNode.querySelector(".price").innerHTML;
    let name = productNode.querySelector(".name").innerHTML;
    let stars = productNode.querySelector(".stars").innerHTML;
    basket.addProduct({
      id: id,
      img: img,
      price: price,
      name: name,
      stars: stars
    });
  });
});

let basket = {
  products: {},
  /**
   * Метод добавляет продукт в корзину.
   * @param {{ id: string, price: string, name: string }} product
   */
  addProduct(product) {
    this.addProductToObject(product);
    this.renderProductInBasket(product);
    this.renderTotalSum();
    this.renderTotalCount();
    this.addRemoveBtnsListeners();
  },

  /**
   * Обработчик события клика по кнопке удаления товара.
   * @param {MouseEvent} event
   */
  removeProductListener(event) {
    //console.log(this); this будет указывать на кнопку, а не на объект basket
    //здесь мы используем basket вместо this, потому что контекст вызова не имеет
    //этих методов и нам надо явно обратиться к нашему объекту корзины
    basket.removeProduct(event);
    basket.renderTotalSum();
    basket.renderTotalCount();
  },

  /**
   * Добавляем слушателей события клика по кнопкам удалить.
   */
  addRemoveBtnsListeners() {
    let btns = document.querySelectorAll(".js-delete");
    for (let i = 0; i < btns.length; i++) {
      //важно указать именно this.removeProductListener, чтобы это была одна и та же
      //функция, а не несколько одинаковых.
      btns[i].addEventListener("click", this.removeProductListener);
    }
  },

  /**
   * Метод отображает общую сумму заказа в корзине.
   */
  renderTotalSum() {
    document.querySelector(".cart-total-sum").textContent = this.getTotalSum();
  },
  renderTotalCount() {
    let countCircle = document.querySelector(".cart-total-count");

    countCircle.style.display = "block";
    countCircle.textContent = this.getTotalCount();
    if (countCircle.textContent == 0) {
      countCircle.style.display = "none";
    }
  },

  /**
   * Метод добавляет продукт в объект с продуктами.
   * @param {{ id: string, price: string, name: string }} product
   */
  addProductToObject(product) {
    if (this.products[product.id] == undefined) {
      this.products[product.id] = {
        price: product.price,
        name: product.name,
        count: 1
      };
    } else {
      this.products[product.id].count++;
    }
  },

  /**
   * Метод отрисовывает продукт в корзине, если там такой уже есть просто
   * увеличивает счетчик на 1.
   * @param {{ id: string, price: string, name: string }} product
   * @returns
   */
  renderProductInBasket(product) {
    let productExist = document.querySelector(
      `.cart-count[data-id="${product.id}"]`
    );
    if (productExist) {
      productExist.textContent++;
      return;
    }
    let productRow = `
            <div class="cart-product">
              <img src="${product.img}" alt="">
                  <div class="description">
                     <p class="name">${product.name}</p>
                      <p class="stars">${product.stars}</p>
                      <div class="cart-price-box">
                         <span class="cart-count" data-id="${product.id}">1</span> x <span>$</span><span class="cart-price">${product.price}</span>
                      </div>
                   </div>
                <button class="delete js-delete" data-id="${product.id}"><i class="fas fa-times-circle"></i></button>
            </div>
        `;
    let cart = document.querySelector(".cart-box");
    cart.insertAdjacentHTML("afterBegin", productRow);
  },

  /**
   * Метод считает стоимость всех продуктов в корзине.
   * @returns {number}
   */
  getTotalSum() {
    let sum = 0;

    for (let key in this.products) {
      sum += this.products[key].price * this.products[key].count;
    }
    return sum;
  },
  getTotalCount() {
    let num = 0;
    for (let key in this.products) {
      num += this.products[key].count;
    }

    return num;
  },
  /**
   * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
   * @param {MouseEvent} event
   */
  removeProduct(event) {
    let id = event.target.parentNode.dataset.id;
    this.removeProductFromObject(id);
    this.removeProductFromBasket(id);
  },

  /**
   * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
   * @param {string} id
   */
  removeProductFromBasket(id) {
    let countTd = document.querySelector(`.cart-count[data-id="${id}"]`);
    if (countTd.textContent == 1) {
      countTd.parentNode.parentNode.parentNode.remove();
    } else {
      countTd.textContent--;
    }
  },

  /**
   * Метод удаляет продукт из объекта с продуктами.
   * @param {string} id
   */
  removeProductFromObject(id) {
    if (this.products[id].count == 1) {
      delete this.products[id];
    } else {
      this.products[id].count--;
    }
  }
};