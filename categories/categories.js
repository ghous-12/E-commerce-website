window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    document.getElementById("category-title").textContent = `${
      category.charAt(0).toUpperCase() + category.slice(1)
    }`;
    fetchProductsByCategory(category);
  }

  fetchCategories();
};

async function fetchCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();

    const categoryDropdown = document.getElementById("categoryDropdown");
    categoryDropdown.innerHTML = `<option value=""></option>`;

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.slug;
      option.textContent = category.name;
      categoryDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function handleCategoryChange() {
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = categoryDropdown.value;

  if (selectedCategory) {
    document.getElementById("category-title").textContent = `${
      selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    }`;
    fetchProductsByCategory(selectedCategory);
  } else {
    document.getElementById("category-title").textContent = "";
    document.getElementById("product-listing").innerHTML = "";
  }
}

async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    renderProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to render products (already provided)
function renderProducts(products) {
  const productList = document.getElementById("product-listing");
  productList.innerHTML = "";

  if (!products || products.length === 0) {
    productList.innerHTML = "No products found in this category.";
    return;
  }

  let divData = "";
  products.forEach((product) => {
    divData += `
        <div class="product-card">
          <img src="${product.images[0]}" alt="${product.title}" class="product-pic" />
          <p><strong>${product.title}</strong></p>
          <p>Price: ${product.price} $</p>
          <input type="button" value="Add to Cart" class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.images[0]}')" />
        </div>
      `;
  });

  productList.innerHTML = divData;
}
