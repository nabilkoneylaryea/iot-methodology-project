/*************************************************************
  For this example you need UIPEthernet library:
    https://github.com/UIPEthernet/UIPEthernet

  Typical wiring would be (this is for Arduino UNO,
  search for correct wiring for your board):
   VCC -- 5V
   GND -- GND
   CS  -- D10
   SI  -- D11
   SCK -- D13
   SO  -- D12
   INT -- D2

  You’ll need:
   - Blynk IoT app (download from App Store or Google Play)
   - Arduino Nano board
   - Decide how to connect to Blynk
     (USB, Ethernet, Wi-Fi, Bluetooth, ...)

  There is a bunch of great example sketches included to show you how to get
  started. Think of them as LEGO bricks  and combine them as you wish.
  For example, take the Ethernet Shield sketch and combine it with the
  Servo example, or choose a USB sketch and add a code from SendData
  example.
 *************************************************************/

// Template ID, Device Name and Auth Token are provided by the Blynk.Cloud
// See the Device Info tab, or Template settings
#define BLYNK_TEMPLATE_ID           "TMPLz4g2rZfl"
#define BLYNK_DEVICE_NAME           "Nano 33 IoT"
#define BLYNK_AUTH_TOKEN            "16UI0VsYRJ1pDSVYuwPw72uil19gHIVi"


// Comment this out to disable prints and save space
#define BLYNK_PRINT Serial

#include <SPI.h>
#include <WiFiNINA.h>
#include <BlynkSimpleWiFiNINA.h>

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "The Crib";
char pass[] = "elijahseesghosts";
//char ssid[] = "IoT_Hotspot";
//char pass[] = "12345678";

char auth[] = BLYNK_AUTH_TOKEN;

// LED CONTROL
BLYNK_WRITE(V0) {
  int pinValue = param.asInt();
  digitalWrite(2, pinValue);
  Serial.print("Changing LED pin to: ");
  Serial.println(pinValue);
}
// Read pulse sensor data
void readPulseSensor() {
  double sensorData = -1;
  if(!((digitalRead(6) == 1)||(digitalRead(7) == 1))){
    sensorData = analogRead(A0);
  }
  else {
    Serial.println("Error reading pulse sensor!");
  }
  Blynk.virtualWrite(V5, sensorData); 
}

BLYNK_CONNECTED() {
  // Can do stuff here
}

BlynkTimer timer;
void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, "blynk.cloud", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
  pinMode(2, OUTPUT);
  pinMode(A0, OUTPUT);
  pinMode(6, INPUT); // Setup for leads off detection LO +
  pinMode(7, INPUT); // Setup for leads off detection LO -
  timer.setInterval(1000L, readPulseSensor);
}

void loop()
{
  Blynk.run();
  timer.run();
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
//  Serial.println("Running BLYNK");
}