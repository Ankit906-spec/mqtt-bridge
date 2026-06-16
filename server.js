const express = require("express");
const mqtt = require("mqtt");
const app = express();
app.use(express.json());

const client = mqtt.connect({
  host: process.env.MQTT_SERVER,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
  protocol: "mqtts"
});

client.on("connect", () => {
  console.log("Connected to HiveMQ");
});

// ✅ ROOT GET HANDLER — added here, right before /order
app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.post("/order", (req, res) => {
  console.log("Order API was called");
  console.log(req.body);
  client.publish(process.env.MQTT_TOPIC, "F");
  console.log("Published: F");
  res.send("OK");
});

app.post("/stop", (req, res) => {
  console.log("Stop API was called");
  client.publish(process.env.MQTT_TOPIC, "S");
  console.log("Published: S");
  res.send("STOP");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server Running");
});
