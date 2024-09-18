window.onload = function () {
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

    categoryDropdown.addEventListener("change", handleCategoryChange);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function handleCategoryChange() {
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = categoryDropdown.value;

  if (selectedCategory) {
    window.location.href = `../categories/categories.html?category=${selectedCategory}`;
  }
}
