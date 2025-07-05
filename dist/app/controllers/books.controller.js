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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const data = yield books_models_1.Books.create(book);
        res.status(200).json({
            success: true,
            messagae: "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            messagae: "Book creation failed",
            error
        });
    }
}));
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield books_models_1.Books.find();
        res.status(200).json({
            success: true,
            messagae: "Books found successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            messagae: "Book found failed",
            error
        });
    }
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_models_1.Books.findById(bookId);
        res.status(200).json({
            success: true,
            messagae: "Book found successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            messagae: "Book found failed",
            error
        });
    }
}));
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const data = yield books_models_1.Books.findByIdAndUpdate(bookId, updatedBody, { new: true });
        res.status(200).json({
            success: true,
            messagae: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            messagae: "Book updation failed",
            error
        });
    }
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_models_1.Books.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            messagae: "Book Deleted successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            messagae: "Book deletion failed",
            error
        });
    }
}));
