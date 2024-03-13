import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  }
}, { timestamps: true });


export const UserModel = mongoose.model('User', userSchema, 'users');
