const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  categoriesList: {
    type: [String]
  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String
  },
  coverImg: {
    type: String
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  blogIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Blog'
  },
  favourite : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Blog'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
