const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE - Add a new user with BMI
router.post('/users', async (req, res) => {
  try {
    const {
      firstName,
      weight,
      height,
      age,
      gender,
      pregnant,
      breastfeeding,
      bmi,
      caffeine,
      phoneNumber
    } = req.body;

    if (phoneNumber) { 
      const exist = await User.find({ 
        phoneNumber
      })
      if (exist) { 
        return res.status(403).json({ message: "Error creating user", error: 'user already exist!' });
      }
    }

    const newUser = new User({
      firstName,
      weight,
      height,
      age,
      gender,
      pregnant,
      breastfeeding,
      bmi,
      caffeine,
      phoneNumber
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc, validate schema
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;