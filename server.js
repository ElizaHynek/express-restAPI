const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const router = express.Router();
const path = require('path');

const socket = require('socket.io');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(400).send('Not found..');
});

io.on('connection', (socket) => {
  console.log('New socket ' + socket.id);
  //socket.emit('seatsUpdated', tasks);
/*
  socket.on('addTask', (task) => {
    console.log('Task added');
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  }); */

});
