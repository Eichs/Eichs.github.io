document.getElementById('gate-server-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyInput = document.getElementById('key');
    const output = document.getElementById('output');
    const key = keyInput.value;
  
    try {
      const response = await fetch(`/api/getgateserver?key=${key}`);
      if (response.status === 200) {
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
      } else {
        const error = await response.json();
        output.textContent = `Error: ${error.error}`;
      }
    } catch (error) {
      output.textContent = `Error: ${error.message}`;
    }
  });
  