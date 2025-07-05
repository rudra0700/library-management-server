import express, { Request, Response } from "express";
import { Books } from "../models/books.models";
import { Borrow } from "../models/borrow.model";
export const borrowRoutes = express.Router();

borrowRoutes.post("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate } = req.body;
    const foundBook = await Books.findById(bookId);

    if (!foundBook) {
      throw new Error("Book not found");
    }
    if (foundBook.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    foundBook.copies -= quantity;
    if (foundBook.copies === 0) {
      foundBook.available = false;
    }
    await foundBook.save();
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book borrowed failed",
      error,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $group: {
          _id: "$book",
          title: { $first: "$bookInfo.title" },
          isbn: { $first: "$bookInfo.isbn" },
          totalBorrowed: { $sum: "$quantity" },
        },
      },
    ]);
     res.status(200).json({
        success: true,
        message: "Found borrowed book collection",
        data
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book borrowed failed",
      error,
    });
  }
});
