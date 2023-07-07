const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find((data) => data.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
	//const { author, text } = req.body;
	//const id = uuid();
	//const newTestimonial = { id: id, author: author, text: text };
	//db.push(newTestimonial);
	res.json({ message: 'ok!' });
});

app.put('/testimonials/:id',(req, res) => {
	const { author, text } = req.body;
	const id = +req.params.id;
	const testimontial = db.find((testimontial) => testimontial.id === id);
	testimontial.author = author;
	testimontial.text = text;
	res.json({ message: 'ok!' })},
	(err) => {
		console.log(err);
	}
);

app.delete('/testimonials/:id',(req, res) => {
	const id = +req.params.id;
	db.splice(
			db.findIndex((testimontial) => testimontial.id === id),
			1
	);
	res.json({ message: 'deleted' });
	},
	(err) => {
		console.log(err);
	}
);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
