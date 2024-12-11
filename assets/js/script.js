// Highlight active navigation link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// Shopping Cart Functionality
let cart = [];

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalItems = document.getElementById('total-items');
  const totalCost = document.getElementById('total-cost');
  const checkoutButton = document.getElementById('checkout');

  // Clear the current cart items
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty. Add items to your bag.</p>';
    checkoutButton.style.display = 'none';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    totalItems.textContent = cart.reduce((total, item) => total + item.quantity, 0);  // Show total items (quantity)
    totalCost.textContent = total.toFixed(2);
    checkoutButton.style.display = 'inline-block';
  }

  // Add functionality for remove buttons in cart
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', function () {
      const mealId = this.dataset.id;
      const meal = cart.find(item => item.id === mealId);
      removeFromCart(meal);
    });
  });
}

function addToCart(meal) {
  const existingMeal = cart.find(item => item.id === meal.id);
  if (existingMeal) {
    existingMeal.quantity += 1;
  } else {
    meal.quantity = 1;
    cart.push(meal);
  }
  updateCart();
}

function removeFromCart(meal) {
  cart = cart.filter(item => item.id !== meal.id);
  updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const mealId = this.parentElement.id;
    const mealName = this.previousElementSibling.previousElementSibling.textContent;
    const mealPrice = parseFloat(this.dataset.price);
    const meal = { id: mealId, name: mealName, price: mealPrice };

    // Hide the "Add to Cart" button and show the "Remove from Cart" button
    this.style.display = 'none';
    const removeButton = this.nextElementSibling;
    removeButton.style.display = 'inline-block';

    addToCart(meal);
  });
});

document.querySelectorAll('.remove-from-cart').forEach(button => {
  button.addEventListener('click', function () {
    const mealId = this.parentElement.id;
    const mealName = this.previousElementSibling.textContent;
    const mealPrice = parseFloat(this.dataset.price);
    const meal = { id: mealId, name: mealName, price: mealPrice };

    // Hide the "Remove from Cart" button and show the "Add to Cart" button
    this.style.display = 'none';
    const addButton = this.previousElementSibling;
    addButton.style.display = 'inline-block';

    removeFromCart(meal);
  });
});

const checkoutButton = document.getElementById('checkout');
if (checkoutButton) {
  checkoutButton.addEventListener('click', function () {
    if (cart.length > 0) {
      alert('Proceeding to checkout...');
    } else {
      alert('Your cart is empty! Please add items before proceeding.');
    }
  });
}

// Category Switching Functionality
const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
  button.addEventListener('click', function () {
    const category = this.getAttribute('data-category');
    document.querySelectorAll('.meal-list').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(category).style.display = 'block';

    // Switch active class for category buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    // Show/hide Add/Remove buttons appropriately
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.style.display = 'inline-block';
    });
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.style.display = 'none';
    });
  });
});

// Default to showing "Vibrant Fruits & Juices" category
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fruits').style.display = 'block';
  categoryButtons[0].classList.add('active');
});

// Profile Form Validation
document.getElementById('accountForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessage = document.getElementById('errorMessage');

  if (password !== confirmPassword) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = "Passwords don't match!";
  } else {
    errorMessage.style.display = 'none';
    alert('Profile updated successfully!');
  }
});

// Order History (Simulated)
document.addEventListener('DOMContentLoaded', () => {
  const ordersList = document.getElementById('ordersList');
  // Simulated order history (This would normally be fetched from a database)
  const orders = [
    { orderNumber: '12345', items: '3 items', total: '$29.99' },
    { orderNumber: '12346', items: '2 items', total: '$19.99' },
  ];

  if (orders.length > 0) {
    ordersList.innerHTML = '';
    orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.innerHTML = `
        <p><strong>Order #${order.orderNumber}</strong></p>
        <p>Items: ${order.items}</p>
        <p>Total: ${order.total}</p>
      `;
      ordersList.appendChild(orderElement);
    });
  } else {
    ordersList.innerHTML = '<p>You have no orders yet.</p>';
  }
});




