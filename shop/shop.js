let currentPage = 1;
const productsPerPage = 16;
let totalProducts = 0;
let search = "";
let category = "";

async function fetchProducts(page = 1, search = "", category = "") {
  try {
    const skip = (page - 1) * productsPerPage;
    let url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${productsPerPage}&skip=${skip}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${skip}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    totalProducts = data.total;

    renderDiv(data.products);
    paginationForShop();
  } catch (error) {
    console.error("Sorry, couldn't fetch products:", error);
  }
}

function renderDiv(products) {
  let divData = "";
  products.forEach((product) => {
    divData += `<div class="product-card">
          <img src="${product.images[0]}" alt="${product.title}" class="product-pic" />
          <p><strong>${product.title}</strong></p>
          <p><a href="../categories/categories.html?category=${product.category}" target="_blank">${product.category}</a></p>
          <p>${product.price} $</p>
          <input type="button" value="Add to Cart" class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.images[0]}')" />
        </div>`;
  });

  document.getElementById("product-container").innerHTML = divData;
}

function paginationForShop() {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const btnContainer = document.getElementById("pagination");
  btnContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "button";
    button.innerText = i;
    button.addEventListener("click", function () {
      currentPage = i;
      fetchProducts(currentPage, search);
      setActiveButton(i);
    });
    btnContainer.appendChild(button);
  }

  setActiveButton(currentPage);
}

function setActiveButton(page) {
  const buttons = document.getElementsByClassName("button");
  Array.from(buttons).forEach((btn) => btn.classList.remove("active"));
  buttons[page - 1].classList.add("active");
}

async function searchProducts() {
  search = document.getElementById("myInput").value;
  currentPage = 1;
  await fetchProducts(currentPage, search, category);
}

document.getElementById("myInput").addEventListener("keyup", searchProducts);

fetchProducts(currentPage, search, category);
