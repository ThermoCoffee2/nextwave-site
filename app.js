const BASE_URL = 'http://82.67.146.55:3001';

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

async function loadItems() {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error('Impossible de charger les articles');
  return await res.json();
}

async function loadHistory() {
  const res = await fetch(`${BASE_URL}/history`);
  if (!res.ok) throw new Error('Impossible de charger l\'historique');
  return await res.json();
}

async function addItemToServer(item) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Erreur lors de l\'ajout de l\'article');
  return await res.json();
}

async function removeItemFromServer(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
}

async function adjustQtyOnServer(id, delta) {
  const res = await fetch(`${BASE_URL}/items/${id}/adjust`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delta })
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour');
}

async function render() {
  clearError();
  try {
    const filter = document.getElementById('filterCategory').value;
    let items = await loadItems();
    if (filter) {
      items = items.filter(i => i.category === filter);
    }
    const tbody = document.querySelector('#inventory tbody');
    tbody.innerHTML = '';
    items.forEach((item) => {
      const row = document.createElement('tr');
      const img = item.photo ? `<img src="${item.photo}" class="thumb">` : '';
      row.innerHTML = `<td>${img}</td><td>${item.ref}</td><td>${item.desc || ''}</td><td>${item.category}</td>` +
        `<td>${item.price}</td><td>${item.qty}</td>` +
        `<td>` +
        `<button onclick="adjustQty(${item.id}, 1)">+1</button>` +
        `<button onclick="adjustQty(${item.id}, -1)">-1</button>` +
        `<button onclick="removeItem(${item.id})">Supprimer</button>` +
        `</td>`;
      tbody.appendChild(row);
    });

    const history = await loadHistory();
    const ul = document.querySelector('#history');
    ul.innerHTML = '';
    history.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = entry;
      ul.appendChild(li);
    });
  } catch (e) {
    setError(e.message);
  }
}

async function addItem() {
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

  const finish = async (photo) => {
    try {
      await addItemToServer({ price, qty, desc, category, photo });
      await render();
    } catch (e) {
      setError(e.message);
    }
  };
  if (file) {
    const reader = new FileReader();
    reader.onload = () => finish(reader.result);
    reader.readAsDataURL(file);
  } else {
    finish(null);
  }
}

async function removeItem(id) {
  clearError();
  try {
    await removeItemFromServer(id);
    await render();
  } catch (e) {
    setError(e.message);
  }
}

async function adjustQty(id, delta) {
  clearError();
  try {
    await adjustQtyOnServer(id, delta);
    await render();
  } catch (e) {
    setError(e.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
});
