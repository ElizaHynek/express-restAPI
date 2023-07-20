const Concert = require('../models/concerts.model');
const uuid = require('uuid');


exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const conc = await Concert.findOne().skip(rand);
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const conc = await Concert.findById(req.params.id);
    if(conc) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json(conc);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(conc) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(conc);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};



exports.getAllByPerformer = async (req, res) => {
  try {
    const conc = await Concert.find({ performer: req.params.performer });
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.getAllByGenre = async (req, res) => {
  try {
    const conc = await Concert.find({ genre: req.params.genre });
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAllByPrice = async (req, res) => {
  try {
    const conc = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max },});
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAllByDay = async (req, res) => {
  try {
    const conc = await Concert.find({ day: req.params.day });
    if(!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } 
  catch (err) {
    res.status(500).json({ message: err });
  }
};
