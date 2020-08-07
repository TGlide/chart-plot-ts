"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const chart_1 = require("./helpers/chart");
const app = express_1.default();
const httpObj = http_1.default().createServer(app);
const io = socket_io_1.default(httpObj);
io.on("connection", (socket) => {
    socket.on("event", (data) => {
        data = chart_1.generateChartData(data);
        socket.emit("setChartData", data);
    });
});
http_1.default.listen(5000);
//# sourceMappingURL=index.js.map