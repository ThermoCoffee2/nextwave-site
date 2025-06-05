const KEY_ITEMS = 'stock_items';
const KEY_HISTORY = 'stock_history';
const KEY_NEXT_ID = 'stock_next_id';

function setError(message) {
  const div = document.getElementById('error');
  if (div) {
    div.textContent = message;
    div.style.display = message ? 'block' : 'none';
  } else if (message) {
    alert(message);
  }
}

function clearError() {
  setError('');
}

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

function loadNextId() {
  const val = localStorage.getItem(KEY_NEXT_ID);
  return val ? parseInt(val) : 1;
}

function saveNextId(id) {
  localStorage.setItem(KEY_NEXT_ID, id.toString());
}

function render() {
  const filter = document.getElementById('filterCategory').value;
  let items = loadItems();
  if (filter) {
    items = items.filter(i => i.category === filter);
  }
  const tbody = document.querySelector('#inventory tbody');
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    const img = item.photo ? `<img src="${item.photo}" class="thumb">` : '';
    row.innerHTML = `<td>${img}</td><td>${item.ref}</td><td>${item.desc || ''}</td><td>${item.category}</td>` +
      `<td>${item.price}</td><td>${item.qty}</td>` +
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
  clearError();
  const price = parseFloat(document.getElementById('priceInput').value);
  const qty = parseInt(document.getElementById('qtyInput').value);
  const desc = document.getElementById('descInput').value.trim();
  const category = document.getElementById('categoryInput').value;
  const file = document.getElementById('photoInput').files[0];

  if (isNaN(price) || isNaN(qty) || price < 0 || qty < 0) {
    setError('Veuillez saisir un prix et une quantité valides.');
    return;
  }
  if (!desc) {
    setError('La description est requise.');
    return;
  }

  const id = loadNextId();
  const ref = id.toString();
  const finish = (photo) => {
    addItemToStorage({ ref, price, qty, desc, category, photo });
    saveNextId(id + 1);
  };
  if (file) {
    const reader = new FileReader();
    reader.onload = () => finish(reader.result);
    reader.readAsDataURL(file);
  } else {
    finish(null);
  }
}

function addItemToStorage(item) {
  const items = loadItems();
  items.push(item);
  saveItems(items);
  const history = loadHistory();
  history.unshift(`Ajout ${item.qty} de réf ${item.ref}`);
  saveHistory(history);
  render();
}

function removeItem(index) {
  const items = loadItems();
  const [removed] = items.splice(index, 1);
  saveItems(items);
  const history = loadHistory();
  history.unshift(`Suppression de réf ${removed.ref}`);
  saveHistory(history);
  render();
}

function adjustQty(index, delta) {
  const items = loadItems();
  items[index].qty += delta;
  saveItems(items);
  const history = loadHistory();
  history.unshift(`${delta > 0 ? '+' : '-'}${Math.abs(delta)} sur réf ${items[index].ref}`);
  saveHistory(history);
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  render();
});
