"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// import app from './app'
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _Socket = require('./controller/Socket'); var _Socket2 = _interopRequireDefault(_Socket);

const server = _http2.default.createServer()

const io = _socketio2.default.call(void 0, server)

const socketController = new (0, _Socket2.default)(io)
socketController.setEventListeners()

server.listen(process.env.BACK_PORT)
console.log("running on port " + process.env.BACK_PORT)