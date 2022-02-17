// Import axios
// const axios = require('axios'); // FIXME: Can't use this must use jquery
// const { response } = require('express');

// $('#btn-led').click( function() {
//     $.get('/jquery/getjsondata', {name:'Steve'}, function (data, textStatus, jqXHR) {
//         $('p').append(data.firstName);
//     });
// });

// Connect to Azure IOT hub
console.log('Connecting to Blynk...')

// FIXME: Just write one function that takes the pin as a param and reads the data -> wrap this function with others to read the heart rate and LED state

// Read Pulse Sensor data
let heartRate = 0;

const readHeartRate = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v5';
    const request = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`;

    // Using Axios (could be done in a MERN app)
    // try {
    //     data = await axios.get(request);
    // }
    // catch(error) {
    //     console.log(`Error reading heart rate!: ${error}`);
    // }

    await $.ajax(request,   // request url
	{            
		success: function (data, status, xhr) {
            heartRate = data;
            console.log(`Success reading heart rate!: ${data}`);
		},
        error: function(jqXhr, textStatus, errorMessage) {
            console.log(`Error reading heart rate!: ${errorMessage}`);
        }
	});
};

// Read LED Status
let ledState = 0;
const ledStatus = (state) => {
    let status;
    if(state == 1) {
        status = 'ON';
    }
    else if(state == 0){
        status = 'OFF';
    }
    else {
        status = 'ERR';
    }

    return status
};
const readLED = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    const request = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`;

    // Using Axios (could be done in a MERN app)
    // try {
    //     data = await axios.get(`https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`);
    // }
    // catch(error) {
    //     console.log(`Error reading LED state!: ${error}`);
    // }

    await $.ajax(request,   // request url
    {            
        success: function (data, status, xhr) {
            ledState = data;
            console.log(`Success reading LED state!: ${data}`);
        },
        error: function(jqXhr, textStatus, errorMessage) {
            console.log(`Error reading LED state!: ${errorMessage}`);
        }
    });
};
const writeLEDLow = async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    const request = `https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=0`;

    // Using Axios (could be done in a MERN app)
    // try {
    //     await axios.get(`https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=0`);
    // }
    // catch(error) {
    //     console.log(`Error writing to LED state!: ${error}`);
    // }

    await $.ajax(request,   // request url
    {            
        success: function (data, status, xhr) {
            // ledState = 0;
            console.log(`Success writing LED low!`);
        },
        error: function(jqXhr, textStatus, errorMessage) {
            console.log(`Error writing LED low!: ${errorMessage}`);
        }
    });
};
const writeLEDHigh= async() => {
    const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
    const PIN = 'v0';
    const request = `https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=1`;

    // Using Axios (could be done in a MERN app)
    // try {
    //     await axios.get(`https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=1`);
    // }
    // catch(error) {
    //     console.log(`Error writing to LED state!: ${error}`);
    // }

    await $.ajax(request,   // request url
    {            
        success: function (data, status, xhr) {
            // ledState = 1;
            console.log(`Success writing LED high!`);
        },
        error: function(jqXhr, textStatus, errorMessage) {
            console.log(`Error writing LED high!: ${errorMessage}`);
        }
    });
};
const toggleLED = async() => {
    if(ledState == 1) {
        await writeLEDLow();
        ledState = 0;
    }
    else {
        await writeLEDHigh();
        ledState = 1;
    }
};

// Getting DOM elements to manipulate
const btnLedToggle = document.getElementById('btn-led');
const ledStateField = document.getElementById('led-status');
const heartRateField = document.getElementById('heart-rate');

// Function to handle LED Control
const onClick = () => {
    console.log('Clicked')
    toggleLED().then(() => { ledStateField.textContent = ledStatus(ledState); });
}

// Manipulate DOM based on values recieved from Azure
btnLedToggle.addEventListener('click', onClick);
// ledStateField.textContent = ledState == 1 ? 'ON' : 'OFF';
readLED().then(() => { ledStateField.textContent = ledStatus(ledState); });
readHeartRate().then(() => { heartRateField.textContent = heartRate; });

