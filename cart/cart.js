function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML =
      "<p>Cart is currently empty. Shop for new products...</p>";
    document.getElementById("total-price-container").style.display = "none";
    return;
  }

  cartItems.forEach((item, index) => {
    const cartCard = document.createElement("div");
    cartCard.classList.add("cart-card");

    cartCard.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-product-image" />
      <div class="cart-details">
        <p><strong>${item.title}</strong></p>
        <p>Price: $${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove Item</button>
        
      </div>
      
      
    `;

    cartContainer.appendChild(cartCard);
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      removeCartItem(button.getAttribute("data-index"));
    });
  });
  calculateTotalPrice();
}

function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const removedItem = cartItems.splice(index, 1)[0];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems();

  calculateTotalPrice();
}

window.onload = loadCartItems;

function calculateTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.price);
  });

  const totalPriceContainer = document.getElementById("total-price-container");
  totalPriceContainer.innerHTML = `Total Price: $${totalPrice.toFixed(2)}
  <button class="check-btn">Checkout</button>`;
}
