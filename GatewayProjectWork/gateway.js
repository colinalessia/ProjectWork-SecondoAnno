const Protocol = require("azure-iot-device-mqtt").Mqtt;
const Client = require("azure-iot-device").Client;
const Message = require("azure-iot-device").Message;
const ByteLength = require("@serialport/parser-byte-length");
const SerialPort = require("serialport");
const Parser = require("binary-parser").Parser;

const port = new SerialPort("COM5", {
    baudRate: 9600,
  });
const parser = port.pipe(new ByteLength({ length: 4 }));


var deviceConnectionString =
  "HostName=colin-hub.azure-devices.net;DeviceId=colin-device2;SharedAccessKey=VoPfby2zKWrEmEX6eey3vSN57tKEw/NYttTJ4tu8SbU=";

function connectCallback() {
  console.log("Client connected");
  //SendMessage(1);

}

// Funzione di log messaggi
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + " error: " + err.toString());
    if (res) console.log(op + " status: " + res.constructor.name);
  };
}

// Riceve dall'IOT Hub
function messageHandler(msg) {
  console.log("Id: " + msg.messageId + " Body: " + msg.data);
  var message = JSON.parse(msg.data);
  sendData(message);
  client.complete(msg, printResultFor("completed"));
}

// Send to pic
function sendData(message) {
  var payload = message.ClassroomName + "*" + message.TeacherName + "*" + message.SubjectName + "*" + message.Duration + "$";
  //console.log(payload.length);
  port.write(payload);
}

//creazione del parser per il protocollo 
function createParserOption()
{
    return  new Parser()
    .uint8("mittente")
    .uint8("destinatario")
    .uint8("operazione")
    .uint8("payload")
} 

//invio all iot hub
function SendMessage(message)
{
    client.sendEvent(new Message(JSON.stringify(message))); //, printResultFor("send"));
}

//ricezione dal pic 
parser.on('data', function (data) {

    var header = createParserOption();
    var message = header.parse(data);
    SendMessage(message)
    console.log(message)
})

let client = Client.fromConnectionString(deviceConnectionString, Protocol);

client.on("connect", connectCallback);
client.on("message", messageHandler);

client.open().catch((err) => {
  console.error("Could not connect: " + err.message);
});