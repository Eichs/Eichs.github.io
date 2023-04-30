document.getElementById('key-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const keyInput = document.getElementById('key');
  const key = keyInput.value;

  try {
    const response = await fetch(`/api/getgateserver?key=${key}`);

    if (response.status === 200) {
      const data = await response.json();
      createGateServerTable(data.gate_servers);
      document.getElementById('gate-server-form').style.display = 'block';
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

function createGateServerTable(gateServers) {
  const tbody = document.getElementById('gate-server-table').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  gateServers.forEach((gateServer) => {
    const row = document.createElement('tr');
    row.classList.add('gate-server-row');

    Object.keys(gateServer).forEach((key) => {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.name = `${key}_${gateServer.ID}`;
      input.value = gateServer[key];
      cell.appendChild(input);
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}

document.getElementById('add-gate-server').addEventListener('click', () => {
  const newRow = {
    ID: '',
    Name: '',
    Title: '',
    Addr: '',
    DispatchUrl: '',
    MuipUrl: '',
    PayCallbackUrl: '',
    MuipSign: '',
    PaySign: '',
  };

  const tbody = document.getElementById('gate-server-table').getElementsByTagName('tbody')[0];
  const row = document.createElement('tr');
  row.classList.add('gate-server-row');

  Object.keys(newRow).forEach((key) => {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.name = `${key}_new`;
    input.value = newRow[key];
    cell.appendChild(input);
    row.appendChild(cell);
  });

  tbody.appendChild(row);
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
      if (field === 'ID' && input.value === '') {
        gateServer[field] = undefined;
      }
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
