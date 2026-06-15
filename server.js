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
