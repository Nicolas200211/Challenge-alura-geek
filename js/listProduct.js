import { conectAPI } from "./script.js";

const productContainer = document.querySelector("#data-products");

//Funcion para renderizar la lista
export async function renderProducts() {
  productContainer.innerHTML = "";
  const products = await conectAPI.listProducts();
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("geek__card");
    productCard.innerHTML = `
    <figure class="card__figure">
    <img src="${product.image}" alt="${product.title}" class="card__figure--img" />
    <figcaption>${product.title}</figcaption>
    </figure>
    <div class="container__delete">
      <strong>$ ${product.cost}</strong>
      <button class="bottom--deleted" data-id="${product.id}">
        <img src="./assets/icon _trash2_.svg" alt="Eliminar">
      </button>
    </div>
        `;
    productContainer.appendChild(productCard);
  });

  // Agregar evento de eliminación a cada botón
  const deleteButtons = document.querySelectorAll(".bottom--deleted");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      await deleteProductHandler(productId);
    });
  });
}
//Funcion para eliminar producto por id
async function deleteProductHandler(productId) {
  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar este producto?"
  );

  if (confirmDelete) {
    try {
      await conectAPI.deleteProduct(productId);
      alert("Producto eliminado correctamente");
      renderProducts(); // Vuelve a renderizar los productos después de eliminar
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Hubo un error al eliminar el producto");
    }
  } else {
    alert("El producto no fue eliminado"); // Mensaje opcional para informar que no se realizó la eliminación
  }
}

// Inicializar la visualización de productos
renderProducts();
