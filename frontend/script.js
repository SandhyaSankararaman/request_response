document.getElementById('submitBtn').addEventListener('click', async () => {
  const jsonInput = document.getElementById('jsonInput').value;
  const errorDiv = document.getElementById('error');
  const filterContainer = document.getElementById('filter-container');
  
  try {
      const jsonData = JSON.parse(jsonInput);
      errorDiv.classList.add('hidden');
      filterContainer.classList.remove('hidden');
      
      const response = await fetch('http://localhost:3000/bfhl', { // Update with your backend URL
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
      });
      
      const data = await response.json();
      displayResponse(data);
  } catch (error) {
      errorDiv.textContent = 'Invalid JSON format';
      errorDiv.classList.remove('hidden');
  }
});

document.getElementById('filterSelect').addEventListener('change', () => {
  const filterSelect = document.getElementById('filterSelect');
  const selectedFilters = Array.from(filterSelect.selectedOptions).map(option => option.value);
  
  const responseData = JSON.parse(document.getElementById('responseOutput').getAttribute('data-json'));
  displayFilteredResponse(responseData, selectedFilters);
});

function displayResponse(data) {
  document.getElementById('responseOutput').setAttribute('data-json', JSON.stringify(data));
  displayFilteredResponse(data, Array.from(document.getElementById('filterSelect').selectedOptions).map(option => option.value));
}

function displayFilteredResponse(data, filters) {
  const result = {};

  if (filters.includes('numbers')) {
      result.numbers = data.numbers;
  }
  if (filters.includes('alphabets')) {
      result.alphabets = data.alphabets;
  }
  if (filters.includes('highest_alphabet')) {
      result.highest_alphabet = data.highest_alphabet;
  }

  document.getElementById('responseOutput').textContent = JSON.stringify(result, null, 2);
}
