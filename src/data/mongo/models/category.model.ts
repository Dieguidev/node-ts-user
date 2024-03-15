import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });


export const CategoryModel = mongoose.model('Category', categorySchema, 'categories');