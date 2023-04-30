document.getElementById('key-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyInput = document.getElementById('key');
    const key = keyInput.value;
  
    try {
      const response = await fetch(`/api/getgateserver?key=${key}`);
      if (response.status === 200) {
        const data = await response.json();
        displayGateServers(data.gate_servers);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
  
  function displayGateServers(gateServers) {
    const tbody = document.getElementById('gate-server-table').tBodies[0];
    tbody.innerHTML = '';
  
    gateServers.forEach((gateServer, index) => {
      const row = tbody.insertRow();
      row.className = 'gate-server-row';
  
      const fields = [
        'ID', 'Name', 'Title', 'Addr', 'DispatchUrl',
        'MuipUrl', 'PayCallbackUrl', 'MuipSign', 'PaySign'
      ];
  
      fields.forEach((field) => {
        const cell = row.insertCell();
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `${field}_${index}`;
        input.value = gateServer[field] || '';
        cell.appendChild(input);
      });
    });
  
    document.getElementById('gate-server-form').style.display = 'block';
  }
  
  document.getElementById('add-gate-server').addEventListener('click', () => {
    const tbody = document.getElementById('gate-server-table').tBodies[0];
    const row = tbody.insertRow();
    row.className = 'gate-server-row';
  
    const fields = [
      'ID', 'Name', 'Title', 'Addr', 'DispatchUrl',
      'MuipUrl', 'PayCallbackUrl', 'MuipSign', 'PaySign'
    ];
  
    fields.forEach((field) => {
      const cell = row.insertCell();
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `${field}`;
      input.value = '';
      cell.appendChild(input);
    });
  });
  
  document.getElementById('gate-server-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyInput = document.getElementById('key');
    const key = keyInput.value;
  
    const gateServers = Array.from(document.getElementsByClassName('gate-server-row')).map((row) => {
      const gateServer = {};
  
      Array.from(row.getElementsByTagName('input')).forEach((input) => {
        const field = input.name.split('_')[0];
        gateServer[field] = input.value;
      });
  
      return gateServer;
    });
  
    try {
      const response = await fetch(`/api/gateconfig?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ GateServers: gateServers }),
      });
  
      if (response.status === 200) {
        alert('Gate servers saved successfully.');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
  