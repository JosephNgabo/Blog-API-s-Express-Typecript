import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
// import { newPostRouter } from "./src/routers/posts/new";
// import { getPostRouter } from "./src/routers/posts/show";
// import { deletePostRouter } from "./routers/post/delete";
// import { updatePostRouter } from "./routers/post/update";
// import { newCommentRouter } from "./routers/comments/new";
// import { deleteCommentRouter } from "./routers/comments/delete";
// import { newCommentRouter, getPostRouter, newPostRouter, deletePostRouter, updatePostRouter, deleteCommentRouter } from "./routers";


const app = express();

// app.use(newPostRouter);
// app.use(getPostRouter);


// app.use(cors(
//     {
//         origin: "*",
//         optionsSuccessStatus: 200
//     }
// ));


// app.all("*", (req, res, next) => {
//     const error = new Error("Not found") as CustomError;
//     error.status = 404;
//     next(error);
// });

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Something went wrong out here please double check" });
  }
);
const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new Error("Error connecting to database");
  }
  app.listen(3000, () => console.log("Server is running on port 3000!"));
};
start();
