"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: ['https://library-management-client-nine.vercel.app']
}));
exports.app.use(express_1.default.json());
exports.app.use("/api/books", books_controller_1.bookRoutes);
exports.app.use("/api/borrow", borrow_controller_1.borrowRoutes);
exports.app.get("/", (req, res) => {
    res.send({
        message: "Library mangement system using Redux"
    });
});
