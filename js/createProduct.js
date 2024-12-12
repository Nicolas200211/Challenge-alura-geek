import { renderProducts } from "./listProduct.js";
import { conectAPI } from "./script.js";

const form = document.querySelector("#form-product");
const clearButton = document.querySelector("#clear-button");
const nameInput = document.querySelector("#form-name");
const costInput = document.querySelector("#form-cost");
const imageInput = document.querySelector("#form-image");
const submitButton = form.querySelector("button[type='submit']");

const errorMessages = {
  name: document.querySelector("#name-error"),
  cost: document.querySelector("#cost-error"),
  image: document.querySelector("#image-error"),
};

// Validaciones de campos con mensajes de error
const validations = {
  isNameValid: () => {
    const valid = nameInput.value.trim().length > 3;
    errorMessages.name.textContent = valid
      ? ""
      : "El nombre debe tener más de 3 caracteres";
    return valid;
  },
  isCostValid: () => {
    const valid = /^[0-9]+$/.test(costInput.value);
    errorMessages.cost.textContent = valid
      ? ""
      : "El precio debe contener solo números";
    return valid;
  },
  isImageValid: () => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|bmp))$/i;
    const valid = urlPattern.test(imageInput.value);
    errorMessages.image.textContent = valid
      ? ""
      : "La URL debe ser válida y terminar en .png, .jpg, etc.";
    return valid;
  },
};

// Función para validar el formulario y mostrar/ocultar mensajes de error
function validateForm() {
  const isFormValid =
    validations.isNameValid() &&
    validations.isCostValid() &&
    validations.isImageValid();

  submitButton.disabled = !isFormValid;
}

// Escuchar cambios en los campos del formulario para validar en tiempo real
[nameInput, costInput, imageInput].forEach((input) =>
  input.addEventListener("input", validateForm)
);

// Crear producto
async function createProduct() {
  try {
    await conectAPI.createProduct(
      nameInput.value.trim(),
      costInput.value.trim(),
      imageInput.value.trim()
    );
    alert("Producto creado correctamente");
    clearForm();
    renderProducts();
  } catch (error) {
    alert(error);
  }
}

// Limpiar formulario y mensajes de error
function clearForm() {
  [nameInput, costInput, imageInput].forEach((input) => (input.value = ""));
  Object.values(errorMessages).forEach((msg) => (msg.style.display = "none"));
  validateForm(); // Deshabilita el botón si el formulario está vacío
}

// Manejador de eventos para el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene la recarga de la página
  createProduct();
});

// Manejador de eventos para el botón "Limpiar"
clearButton.addEventListener("click", clearForm);

// Deshabilitar el botón al inicio
submitButton.disabled = true;
