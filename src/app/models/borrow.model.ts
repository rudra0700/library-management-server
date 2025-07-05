import { model, Schema } from "mongoose";

export const borrowSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: "Books", required: true},
    quantity: {type: Number, required: true, min: 0},
    dueDate: {type: Date, required: true}
}, {timestamps: true});

export const Borrow = model("Borrow", borrowSchema)