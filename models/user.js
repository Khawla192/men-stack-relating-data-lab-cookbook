const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // title: {
  //   type: String,
  //   required: true,
  // },
  // notes: {
  //   type: String,
  // },
  // postingLink: {
  //   type: String,
  // },
  // status: {
  //   type: String,
  //   enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
  // },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
