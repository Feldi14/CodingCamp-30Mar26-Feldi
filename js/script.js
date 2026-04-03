let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;

  if (!name || !price || !category) {
    alert("Isi semua field!");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    category
  };

  transactions.push(transaction);
  saveData();
  render();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveData();
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  transactions.forEach(t => {
    total += t.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${t.name} - $${t.price} (${t.category})
      <button class="delete" onclick="deleteTransaction(${t.id})">X</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("balance").innerText = "$" + total.toFixed(2);

  updateChart();
}

let chart;

function updateChart() {
  const data = {
    Food: 0,
    Transport: 0,
    Fun: 0
  };

  transactions.forEach(t => {
    data[t.category] += t.price;
  });

  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

render();
