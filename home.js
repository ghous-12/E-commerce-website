async function fetchDynamicShoes() {
  try {
    let url = `https://dummyjson.com/products/category/mens-shoes?limit=4`;

    const response = await fetch(url);
    const data = await response.json();

    renderHomePageProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderHomePageProducts(products) {
  let divData = "";
  products.forEach((product) => {
    divData += `<div class="dynamic-product-card">
          <img src="${product.images[1]}" alt="${product.title}" class="dynamic-shoe-pic" />
          <p class="dynamic-text"><strong>${product.title}</strong></p>
          <p class="dynamic-text">${product.price} $</p>
          <input type="button" value="Add To Cart" class="dynamic-button" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.images[0]}')" />
        </div>`;
  });

  document.getElementById("dynamic-products").innerHTML = divData;
}

fetchDynamicShoes();
displayCartItems();
