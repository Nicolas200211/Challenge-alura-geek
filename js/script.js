// const url = "https://my-json-server.typicode.com/frankruiz90/challenge-alura-geek/";
// const url = "http://localhost:3001/";
const url = 'https://6740ce51d0b59228b7f16a98.mockapi.io/api/v1/';

// Función genérica para manejar solicitudes HTTP
async function makeRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${url}${endpoint}`, options);
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  return response.json();
}

// Listar productos
async function listProducts() {
  return await makeRequest("products/", "GET");
}

// Crear un nuevo producto
async function createProduct(title, cost, image) {
  const newProduct = { title, cost, image };
  return await makeRequest("products/", "POST", newProduct);
}

// Eliminar un producto por ID
async function deleteProduct(id) {
  return await makeRequest(`products/${id}`, "DELETE");
}

// Exportar funciones
export const conectAPI = {
  listProducts,
  createProduct,
  deleteProduct,
};
