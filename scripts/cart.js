class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartCounter();
  }

  bindEvents() {
    // Добавление товара в корзину
    document.querySelector('.details__product-btn')?.addEventListener('click', () => this.addToCartFromDetails());
    
    // Открытие корзины
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-js-cart-btn]')) {
        this.updateCartUI();
      }
      
      // Удаление товара
      if (e.target.closest('.modal-cart__card-delete')) {
        const card = e.target.closest('.modal-cart__card');
        const index = card.dataset.index;
        this.removeItem(index);
      }
    });
  }

  addToCartFromDetails() {
    const product = {
      id: document.querySelector('.details__product-id')?.textContent.replace('Артикул: ', ''),
      name: document.querySelector('.details__product-title')?.textContent,
      price: parseInt(document.querySelector('.details__product-price')?.textContent.replace(/[^\d]/g, '')),
      size: document.querySelector('#size')?.value,
      color: document.querySelector('#color')?.value,
      image: document.querySelector('.details__slider .swiper-slide-active img')?.src
    };

    if (product.id && product.name && !isNaN(product.price)) {
      this.addToCart(product);
    } else {
      console.error('Не удалось получить данные товара');
    }
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => 
      item.id === product.id && item.size === product.size && item.color === product.color
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }

    this.saveCart();
    this.updateCartUI();
    this.updateCartCounter();
    this.showAddToCartNotification(product.name);
  }

  showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification__inner">
        <p>Товар "${productName}" добавлен в корзину</p>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateCartUI();
      this.updateCartCounter();
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCartUI() {
    const cartContainer = document.querySelector('.modal-cart');
    if (!cartContainer) return;

    const itemsContainer = cartContainer.querySelector('.modal-cart__items') || document.createElement('div');
    itemsContainer.className = 'modal-cart__items';
    
    // Очищаем контейнер
    itemsContainer.innerHTML = '';
    
    let total = 0;

    this.cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'modal-cart__card';
      itemElement.dataset.index = index;
      
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="modal-cart__card-img">
        <div class="modal-cart__card-content">
          <h3 class="modal-cart__card-name">${item.name.toUpperCase()}</h3>
          <div class="modal-cart__card-details">
            <p>Размер ${item.size}</p>
            <p>Цвет ${item.color}</p>
            <p>Кол-во ${item.quantity}</p>
          </div>
        </div>
        <div class="modal-cart__card-price">${item.price * item.quantity} ₽</div>
        <button class="modal-cart__card-delete">
            <img src="assets/icons/cross.svg" alt="Удалить">
        </button>
      `;
      
      itemsContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    // Добавляем контейнер с товарами в корзину, если его нет
    if (!cartContainer.querySelector('.modal-cart__items')) {
      cartContainer.insertBefore(itemsContainer, cartContainer.querySelector('.modal-cart__total'));
    }

    // Обновляем итоговую сумму
    const totalContainer = cartContainer.querySelector('.modal-cart__total');
    if (totalContainer) {
      totalContainer.innerHTML = `
        <p>ИТОГО:</p>
        <p>${total} ₽</p>
      `;
    }
  }

  updateCartCounter() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('[data-js-cart-btn]');
    
    if (cartBtn) {
      const existingCounter = cartBtn.querySelector('.cart-counter');
      if (existingCounter) {
        existingCounter.textContent = totalItems;
        existingCounter.style.display = totalItems > 0 ? 'flex' : 'none';
      } else if (totalItems > 0) {
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = totalItems;
        cartBtn.appendChild(counter);
      }
    }
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

// Инициализация корзины
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new Cart();
});