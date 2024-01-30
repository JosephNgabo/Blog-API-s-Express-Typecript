import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post(
  "/api/post/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    if (!title || !content) {
      const error = new Error("Please input title and content") as CustomError;
      error.status = 400;
      return next(error);
    }
    const newPost = new Post({
      title,
      content,
    });
    await newPost.save();
    res.status(201).send(newPost).json("Post created successfully");
  }
);
export { router as newPostRouter };

// In order to declare anything globarly you can use the following
// declare global {
//     interface CustomError extends Error {
//         status?: number;
//     }
