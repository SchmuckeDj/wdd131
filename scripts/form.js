const products = [
  { id: 1, name: "Smart Thermostat" },
  { id: 2, name: "Wireless Headphones" },
  { id: 3, name: "Gaming Mouse" },
  { id: 4, name: "4K Monitor" }
];

const select = document.getElementById("product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  select.appendChild(option);
});