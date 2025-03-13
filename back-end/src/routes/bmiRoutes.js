const express = require('express');
const router = express.Router();
const db = require('../models/db');

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

    // Validation
    if (!firstName || !weight || !height || !age || !gender || !bmi || caffeine === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (weight <= 0 || weight > 250) {
      return res.status(400).json({ message: 'وزن نمی‌تواند منفی یا بیش از 250 کیلوگرم باشد' });
    }

    if (height <= 0) {
      return res.status(400).json({ message: 'قد نمی‌تواند منفی باشد' });
    }

    if (age < 0 || age > 150) {
      return res.status(400).json({ message: 'سن نمی‌تواند منفی یا بیش از 150 سال باشد' });
    }

    if (gender !== 'male' && gender !== 'female') {
      return res.status(400).json({ message: 'جنسیت باید "male" یا "female" باشد' });
    }

    if (pregnant && pregnant !== 'yes' && pregnant !== 'no') {
      return res.status(400).json({ message: 'وضعیت بارداری باید "yes" یا "no" باشد' });
    }

    if (breastfeeding && breastfeeding !== 'yes' && breastfeeding !== 'no') {
      return res.status(400).json({ message: 'وضعیت شیردهی باید "yes" یا "no" باشد' });
    }

    if (bmi < 0) {
      return res.status(400).json({ message: 'BMI نمی‌تواند منفی باشد' });
    }

    if (caffeine < 0) {
      return res.status(400).json({ message: 'کافئین نمی‌تواند منفی باشد' });
    }

    // Insert user into database
    const [result] = await db.execute(
      `INSERT INTO users 
       (firstName, weight, height, age, gender, pregnant, breastfeeding, bmi, caffeine, phoneNumber) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName, 
        weight, 
        height, 
        age, 
        gender, 
        pregnant || 'no', 
        breastfeeding || 'no', 
        bmi, 
        caffeine,
        phoneNumber || null
      ]
    );

    // Get the inserted user
    const [user] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(user[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// READ - Get all users
router.get('/users', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users ORDER BY createdAt DESC');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// READ - Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// UPDATE - Update a user
router.put('/users/:id', async (req, res) => {
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

    // Check if user exists
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    
    if (existingUsers.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (firstName !== undefined) {
      updates.push('firstName = ?');
      values.push(firstName);
    }
    
    if (weight !== undefined) {
      updates.push('weight = ?');
      values.push(weight);
    }
    
    if (height !== undefined) {
      updates.push('height = ?');
      values.push(height);
    }
    
    if (age !== undefined) {
      updates.push('age = ?');
      values.push(age);
    }
    
    if (gender !== undefined) {
      updates.push('gender = ?');
      values.push(gender);
    }
    
    if (pregnant !== undefined) {
      updates.push('pregnant = ?');
      values.push(pregnant);
    }
    
    if (breastfeeding !== undefined) {
      updates.push('breastfeeding = ?');
      values.push(breastfeeding);
    }
    
    if (bmi !== undefined) {
      updates.push('bmi = ?');
      values.push(bmi);
    }
    
    if (caffeine !== undefined) {
      updates.push('caffeine = ?');
      values.push(caffeine);
    }
    
    if (phoneNumber !== undefined) {
      updates.push('phoneNumber = ?');
      values.push(phoneNumber);
    }

    // Add ID to values array for WHERE clause
    values.push(req.params.id);

    // Execute update query
    await db.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Get updated user
    const [updatedUsers] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    
    res.status(200).json(updatedUsers[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE - Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    // Check if user exists
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    
    if (existingUsers.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await db.execute(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;