// Connect to Azure IOT hub
console.log('Connecting to Azure IOT Hub...')

// Read Pulse Sensor data
let heartRate = 0;

// Read LED Status
let ledStatus = false;

// Getting DOM elements to manipulate
const btnLedToggle = document.getElementById('btn-led');
const ledStatusField = document.getElementById('led-status');
const heartRateField = document.getElementById('heart-rate');

// Function to handle LED Control
const onClick = () => {
    console.log('Clicked')
    ledStatus = !ledStatus;
    // Update value in Azure
}

// Manipulate DOM based on values recieved from Azure
btnLedToggle.addEventListener('click', onClick);
ledStatusField.textContent = ledStatus ? 'ON' : 'OFF';
heartRateField.textContent = heartRate;
