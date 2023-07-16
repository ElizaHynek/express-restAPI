const Testimonial = require('../models/testimonials.model');
const uuid = require('uuid');


exports.getRandom = async (req, res) => {
  req.db.collection('testimonials').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
};

exports.getAll = async (req, res) => {
	req.db.collection('testimonials').find().toArray((err, data) => {
		if(err) res.status(500).json({ message: err });
		res.json(data);
	});
};

exports.getById = async (req, res) => {
  req.db.collection('testimonials').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found...' });
    else res.json(data);
  });
};

exports.postAll = async (req, res) => {
  const { author, text } = req.body;
  req.db.collection('testimonials').insertOne({ author: author, text: text }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
};

exports.putById = async (req, res) => {
  const { author, text } = req.body;
  req.db.collection('testimonials').updateOne({ _id: ObjectId(req.params.id) }, { $set: { author: author, text: text }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
};

exports.deleteById = async (req, res) => {
  req.db.collection('testimonials').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
};
