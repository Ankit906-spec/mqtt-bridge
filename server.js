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

client.on("error", (err) => {
  console.log("MQTT Error: " + err);
});

app.get("/", (req, res) => {
  res.send("Restaurant Robot Server is running!");
});

app.post("/order", (req, res) => {
  console.log("Order received:", req.body);

  const table_id = req.body.table_id;
  const menu = req.body.menu;

  if (!table_id) {
    return res.status(400).send("Missing table_id");
  }

  const payload = JSON.stringify({
    table_id: table_id,
    menu: menu
  });

  client.publish(process.env.MQTT_TOPIC, payload);
  console.log("Published to MQTT:", payload);
  res.send("OK");
});

app.post("/stop", (req, res) => {
  client.publish(process.env.MQTT_TOPIC, JSON.stringify({ command: "stop" }));
  console.log("Stop command sent");
  res.send("STOP");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server Running on port " + (process.env.PORT || 10000));
});
