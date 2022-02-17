// Import axios
const axios = require('axios'); // FIXME: Can't use this must use jquery

// $('#btn-led').click( function() {
//     $.get('/jquery/getjsondata', {name:'Steve'}, function (data, textStatus, jqXHR) {
//         $('p').append(data.firstName);
//     });
// });

// Connect to Azure IOT hub
console.log('Connecting to Blynk...')

// Read Pulse Sensor data
const readHeartRate = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v5';
    const data = -1;

    try {
        data = await axios.get(`https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`);
    }
    catch(error) {
        console.log(`Error reading heart rate!: ${error}`);
    }

    return data;
};
const heartRate = readHeartRate();

// Read LED Status
const readLED = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    const data = -1;

    try {
        data = await axios.get(`https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`);
    }
    catch(error) {
        console.log(`Error reading LED state!: ${error}`);
    }

    return data;
};
const writeLEDLow = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    try {
        await axios.get(`https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=0`);
    }
    catch(error) {
        console.log(`Error reading LED state!: ${error}`);
    }
};
const writeLEDHigh= async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    try {
        await axios.get(`https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=1`);
    }
    catch(error) {
        console.log(`Error reading LED state!: ${error}`);
    }
};
const toggleLED = async() => {
    if(isLEDHigh) {
        writeLEDLow();
    }
    else {
        writeLEDHigh();
    }
};
const isLEDHigh = readLED() == 1;

// Getting DOM elements to manipulate
const btnLedToggle = document.getElementById('btn-led');
const ledStatusField = document.getElementById('led-status');
const heartRateField = document.getElementById('heart-rate');

// Function to handle LED Control
const onClick = () => {
    console.log('Clicked')
    toggleLED();
}

// Manipulate DOM based on values recieved from Azure
btnLedToggle.addEventListener('click', onClick);
ledStatusField.textContent = isLEDHigh ? 'ON' : 'OFF';
heartRateField.textContent = heartRate;
