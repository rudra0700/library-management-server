import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";


export const app : Application = express();

app.use(
  cors({
    origin: ['https://library-management-client-nine.vercel.app']
   })
);
app.use(express.json());

app.use("/api/books", bookRoutes)
app.use("/api/borrow", borrowRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "Library mangement system using Redux"
    })
})