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

