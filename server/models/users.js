const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: false,
    default: 'user'
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  profilepicture: {
    type: String,
    required: false,
    default: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
  },
  description: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
