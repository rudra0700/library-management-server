import express, { Request, Response } from "express"
import { Books } from "../models/books.models";
export const bookRoutes = express.Router();

bookRoutes.post("/", async (req : Request,  res: Response) => {
    try {
        const book = req.body;
        const data = await Books.create(book);
        res.status(200).json({
            success: true,
            messagae: "Book created successfully",
            data
        })
    } catch (error) {
      res.status(400).json({
        success: false,
        messagae: "Book creation failed",
        error
      })
    }
   
});

bookRoutes.get("/", async (req : Request, res: Response) => {
  try {
    const data = await Books.find();
      res.status(200).json({
            success: true,
            messagae: "Books found successfully",
            data
        })
  } catch (error) {
    res.status(400).json({
        success: false,
        messagae: "Book found failed",
        error
      })
  }
});

bookRoutes.get("/:bookId", async (req : Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Books.findById(bookId);
      res.status(200).json({
            success: true,
            messagae: "Book found successfully",
            data
        })
  } catch (error) {
    res.status(400).json({
        success: false,
        messagae: "Book found failed",
        error
      })
  }
});

bookRoutes.put("/:bookId", async (req : Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body
    const data = await Books.findByIdAndUpdate(bookId, updatedBody, {new: true});
      res.status(200).json({
            success: true,
            messagae: "Book updated successfully",
            data
        })
  } catch (error) {
    res.status(400).json({
        success: false,
        messagae: "Book updation failed",
        error
      })
  }
});

bookRoutes.delete("/:bookId", async (req : Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Books.findByIdAndDelete(bookId);
      res.status(200).json({
            success: true,
            messagae: "Book Deleted successfully",
            data
        })
  } catch (error) {
    res.status(400).json({
        success: false,
        messagae: "Book deletion failed",
        error
      })
  }
});

