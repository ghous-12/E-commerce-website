const mainDiv = document.getElementById("main");
function openCart() {
  document.getElementById("mySidenav").style.width = "350px";

  displayCartItems();

  if ((onclick = "openCart()")) {
    mainDiv.classList.add("background");
  }
}

function closeCart() {
  document.getElementById("mySidenav").style.width = "0";

  if ((onclick = "closeCart()")) {
    mainDiv.classList.remove("background");
  }
}
function displayCartItems() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let cartHTML = "";

  if (cartItems.length === 0) {
    cartHTML = "No products in the cart";
  } else {
    cartItems.forEach((item) => {
      cartHTML += `
              <img src="${item.image}" alt="${item.title}" class="cart-product-image" />
            <div class="cart-product">
              <p><strong>${item.title}</strong></p>
              <p class="cart-product-price">Price: ${item.price} $</p>
            </div>
            <hr class="product-line"/>`;
    });
  }

  document.getElementById("single-product").innerHTML = cartHTML;
}
