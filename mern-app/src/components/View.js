import React from 'react';
import axios from 'axios';

const AUTH_TOKEN = '16UI0VsYRJ1pDSVYuwPw72uil19gHIVi';
const LED_PIN = 'v0';
const HEART_RATE_PIN = 'v5';
const getRequest = (PIN) => axios.get(`https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&${PIN}`);
const updateRequest = (PIN, VALUE) => axios.get(`https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}&${PIN}=${VALUE}`);

function View() {
    const 

  return (
    <div>
        <div>Heart Rate: </div>
    </div>
  )
}

export default View