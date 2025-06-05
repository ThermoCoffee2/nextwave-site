const KEY_ITEMS = 'stock_items';
const KEY_HISTORY = 'stock_history';

function loadItems() {
  const json = localStorage.getItem(KEY_ITEMS);
  return json ? JSON.parse(json) : [];
}

function saveItems(items) {
  localStorage.setItem(KEY_ITEMS, JSON.stringify(items));
}

function loadHistory() {
  const json = localStorage.getItem(KEY_HISTORY);
  return json ? JSON.parse(json) : [];
}

function saveHistory(history) {
  localStorage.setItem(KEY_HISTORY, JSON.stringify(history));
}

function render() {
  const items = loadItems();
  const tbody = document.querySelector('#inventory tbody');
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    const img = item.photo ? `<img src="${item.photo}" class="thumb">` : '';
    row.innerHTML = `<td>${img}</td><td>${item.ref}</td><td>${item.price}</td><td>${item.qty}</td>` +
      `<td>` +
      `<button onclick="adjustQty(${index}, 1)">+1</button>` +
      `<button onclick="adjustQty(${index}, -1)">-1</button>` +
      `<button onclick="removeItem(${index})">Supprimer</button>` +
      `</td>`;
    tbody.appendChild(row);
  });

  const history = loadHistory();
  const ul = document.querySelector('#history');
  ul.innerHTML = '';
  history.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    ul.appendChild(li);
  });
}

function addItem() {
  const ref = document.getElementById('refInput').value.trim();
  const price = parseFloat(document.getElementById('priceInput').value);
  const qty = parseInt(document.getElementById('qtyInput').value);
  const file = document.getElementById('photoInput').files[0];
  if (!ref || isNaN(price) || isNaN(qty)) return;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      addItemToStorage({ref, price, qty, photo: reader.result});
    };
    reader.readAsDataURL(file);
  } else {
    addItemToStorage({ref, price, qty});
  }
}

function addItemToStorage(item) {
  const items = loadItems();
  items.push(item);
  saveItems(items);
  const history = loadHistory();
  history.unshift(`Ajout ${item.qty} de ${item.ref} (prix ${item.price})`);
  saveHistory(history);
  render();
}

function removeItem(index) {
  const items = loadItems();
  const [removed] = items.splice(index, 1);
  saveItems(items);
  const history = loadHistory();
  history.unshift(`Suppression de ${removed.ref}`);
  saveHistory(history);
  render();
}

function adjustQty(index, delta) {
  const items = loadItems();
  items[index].qty += delta;
  saveItems(items);
  const history = loadHistory();
  history.unshift(`${delta>0?'+':'-'}${Math.abs(delta)} ${items[index].ref}`);
  saveHistory(history);
  render();
}

function computeStats() {
  const items = loadItems();
  let totalQty = 0;
  let totalValue = 0;
  items.forEach(item => {
    totalQty += item.qty;
    totalValue += item.qty * item.price;
  });
  return {count: items.length, totalQty, totalValue};
}

function renderStats() {
  const stats = computeStats();
  const section = document.getElementById('statsSection');
  section.innerHTML = `<h2>Statistiques</h2>` +
    `<p>Nombre de références: ${stats.count}</p>` +
    `<p>Quantité totale: ${stats.totalQty}</p>` +
    `<p>Valeur totale: ${stats.totalValue.toFixed(2)}</p>`;
}

function showSection(name) {
  document.getElementById('inventorySection').style.display = name === 'inventory' ? 'block' : 'none';
  document.getElementById('statsSection').style.display = name === 'stats' ? 'block' : 'none';
  if (name === 'stats') {
    renderStats();
  } else {
    render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
});
