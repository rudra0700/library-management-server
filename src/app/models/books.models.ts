import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
  },
   isbn: {type: Number, required: true},
   description: {type: String},
   copies : {type: Number, required: true, min: 1},
   available: {type: Boolean, default: true}
}, {timestamps: true});

export const Books = model("Books", bookSchema)
