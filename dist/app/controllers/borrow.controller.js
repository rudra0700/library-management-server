"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate } = req.body;
        const foundBook = yield books_models_1.Books.findById(bookId);
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
        yield foundBook.save();
        const borrow = yield borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Book borrowed failed",
            error,
        });
    }
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
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
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Book borrowed failed",
            error,
        });
    }
}));
