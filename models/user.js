const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const canteenSchema = new mongoose.Schema({
  name: String,
  image: String,
  menu: [dishSchema]
});

const Canteen = mongoose.model('Canteen', canteenSchema);

module.exports = { Canteen };

// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
