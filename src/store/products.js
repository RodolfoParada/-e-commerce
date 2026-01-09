// products.js
let products = [];
let currentId = 1;

function create(data) {
  const product = {
    id: currentId++,
    name: data.name,
    price: data.price,
    stock: data.stock ?? 0
  };

  products.push(product);
  return product;
}

function findById(id) {
  return products.find(p => p.id === id);
}

function clear() {
  products = [];
  currentId = 1;
}

module.exports = {
  create,
  findById,
  clear
};
