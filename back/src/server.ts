// import app from './app'
import socketio from 'socket.io'
import http from 'http'
import SocketControler from './controller/Socket'

const server = http.createServer()

const io = socketio(server)

const socketController = new SocketControler(io)
socketController.setEventListeners()

server.listen(process.env.BACK_PORT)
console.log("running on port " + process.env.BACK_PORT)