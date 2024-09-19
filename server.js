const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const { Canteen } = require('./models/user');

// Get all canteens
app.get('/api/canteens', async (req, res) => {
  try {
    const canteens = await Canteen.find();
    res.json(canteens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new canteen
app.post('/api/canteens', async (req, res) => {
  const { name, image, menu } = req.body;
  try {
    const newCanteen = new Canteen({ name, image, menu });
    await newCanteen.save();
    res.status(201).json(newCanteen);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Place an order
app.post('/api/order', async (req, res) => {
  const { dish, quantity, canteenAddress } = req.body;
  // Add logic to place an order
  res.json({ message: 'Order placed successfully' });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
