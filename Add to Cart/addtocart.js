function addToCart(id, title, price, image, quantity) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingProduct = cartItems.find((item) => item.id === id);
  if (existingProduct) {
    alert("Product already exists in cart");
  } else {
    cartItems.push({ id, title, price, image, quantity });
    alert("Product added to cart successfully");
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  displayCartItems();
}
