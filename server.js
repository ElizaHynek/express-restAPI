const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);


app.use((req, res) => {
  res.status(400).send('Not found..');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});