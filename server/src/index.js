var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var { generateChartData } = require("./helpers/chart");

io.on("connection", (socket) => {
  console.log("An user connected");
  socket.on("event", (data) => {
    console.log("Data received, length =", data.length);
    data = generateChartData(data);
    socket.emit("setChartData", data);
  });
});
http.listen(5000, () => {
  console.log("listening on *:5000");
});
