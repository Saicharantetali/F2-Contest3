let coinData = []; 


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    coinData = data; 
    renderTable(coinData);
  })
  .catch(error => {
    console.log('Error:', error);
  });


async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    coinData = await response.json(); 
    renderTable(coinData);
  } catch (error) {
    console.log('Error:', error);
  }
}


function renderTable(data) {
  const coinTableBody = document.getElementById('coinTableBody');
  coinTableBody.innerHTML = '';

  data.forEach(coin => {
    const { name, id, image, symbol, current_price, total_volume } = coin;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td>${id}</td>
      <td><img src="${image}" alt="${name}" width="20"></td>
      <td>${symbol}</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;
    coinTableBody.appendChild(row);
  });
}


const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value;
  const filteredData = coinData.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()));
  renderTable(filteredData);
});


const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', () => {
  const sortedData = coinData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});