const express = require('express');
const cors = require('cors');
//const uuid = require('uuid');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const helmet = require('helmet');


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket ' + socket.id);
});

//mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true }); //uhXvT3StoJPUvtFB
mongoose.connect('mongodb+srv://elizunia:uhXvT3StoJPUvtFB@cluster0.letdqgu.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;