// import app from './app'
import socketio from 'socket.io'
import http from 'http'
import SocketControler from './controller/Socket'

const server = http.createServer()

const io = socketio(server)

const socketController = new SocketControler(io)
socketController.setEventListeners()

server.listen(3333)
console.log("running on port " + 3333)