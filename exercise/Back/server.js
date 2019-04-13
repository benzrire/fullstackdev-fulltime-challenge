import routes from './routes'
import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import request from 'es6-request'

// jose8fsmEUtUj6Pt

// database connection
const uri = 'mongodb+srv://benzrire:jose8fsmEUtUj6Pt@igglocker-a6dxg.gcp.mongodb.net/igg_locker?retryWrites=true'
mongoose.connect(uri).then(
  () => {
    console.log('Connected')
  },
  err => {
    console.log('Error ' + err.message)
  }
)

// listen port
const port = 5001

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

// routes all routers
app.use('/', routes)

const server = http.Server(app)
const io = socketIO(server)

var inprogress = []

io.on('connection', socket => {
  console.log('socket> a user connected')
  io.sockets.emit('inprogress list', inprogress)

  socket.on('progress', (locker_number) => {
    inprogress.push(locker_number)
    io.sockets.emit('inprogress list', inprogress)
    console.log('socket> progress ' + inprogress)
  })

  socket.on('unprogress', (locker_number) => {
    let index = inprogress.indexOf(locker_number)
    if(index > -1) {
      inprogress.splice(index, 1)
    }
    io.sockets.emit('inprogress list', inprogress)
    console.log('socket> unprogress' + inprogress)
  })

  socket.on('refresh', () => {
    io.sockets.emit('refresh')
  })

  socket.on('disconnect', () => {
    console.log('socket> a user disconnected')
  })
})

server.listen(port, () => {
  console.log('The server listening on port ' + port)
})
