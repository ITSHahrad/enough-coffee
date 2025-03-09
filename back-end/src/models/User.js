const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'نام الزامی است'],
    trim: true,
    minlength: [1, 'نام نمی‌تواند خالی باشد'],
    maxlength: [50, 'نام نمی‌تواند بیش از 50 کاراکتر باشد'],
  },
  weight: {
    type: Number,
    required: [true, 'وزن الزامی است'],
    min: [0, 'وزن نمی‌تواند منفی باشد'],
    max: [250, 'وزن نمی‌تواند بیش از 250 کیلوگرم باشد'],
  },
  height: {
    type: Number,
    required: [true, 'قد الزامی است'],
    min: [0, 'قد نمی‌تواند منفی باشد'],
  },
  age: {
    type: Number,
    required: [true, 'سن الزامی است'],
    min: [0, 'سن نمی‌تواند منفی باشد'],
    max: [150, 'سن نمی‌تواند بیش از 150 سال باشد'],
  },
  gender: {
    type: String,
    required: [true, 'جنسیت الزامی است'],
    enum: {
      values: ['male', 'female'],
      message: 'جنسیت باید "male" یا "female" باشد',
    },
  },
  pregnant: {
    type: String,
    enum: {
      values: ['yes', 'no'],
      message: 'وضعیت بارداری باید "yes" یا "no" باشد',
    },
    default: 'no',
  },
  breastfeeding: {
    type: String,
    enum: {
      values: ['yes', 'no'],
      message: 'وضعیت شیردهی باید "yes" یا "no" باشد',
    },
    default: 'no',
  },
  bmi: {
    type: Number,
    required: [true, 'شاخص توده بدنی (BMI) الزامی است'],
    min: [0, 'BMI نمی‌تواند منفی باشد'],
  },
  caffeine: {
    type: Number,
    required: [true, 'میزان کافئین الزامی است'],
    min: [0, 'کافئین نمی‌تواند منفی باشد'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { 
  versionKey: false
});

// Indexes (optional, for performance)
userSchema.index({ firstName: 1 }); // Index on firstName for faster searches
userSchema.index({ createdAt: -1 }); // Index on createdAt for sorting by date

const User = mongoose.model('User', userSchema);

module.exports = User;