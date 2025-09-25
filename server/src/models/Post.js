
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hotelLocation: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerContactNumber: {
    type: Number,
  },

  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },

  gender: {
    type: String,
    enum: ["male", "female", "unisex"],
    default: "unisex",
  },

  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, "You must provide at least 3 images."],
  },

  isAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },

  availableBeds: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  nearArea: {
    type: [String],
    required: true,
  },

  facilities: {
    type: [String],
    required: true,
  },

  slug: {
    type: String,
    lowercase: true,
  },


});


function arrayLimit(val) {
  return val.length >= 3;
}

export default mongoose.model("Post", postSchema);


