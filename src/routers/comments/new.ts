import { Router, Request, Response, NextFunction } from "express";
import Comment from "src/models/comment";
import Post from "../../models/post";

const router = Router();

router.post(
  "/api/comment/new/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!content) {
      const error = new Error("Please first enter your content") as CustomError;
      error.status = 400;
      return next(error);
    }
    const newComment = new Comment({
      userName: userName ? userName : "Anonymous",
      content,
    });
    await newComment.save();
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment } },
      { new: true }
    );
    res.status(201).send(updatedPost).json("Comment created successfully");
  }
);
export { router as newCommentRouter };




// In order to declare anything globarly you can use the following
// declare global {
//     interface CustomError extends Error {
//         status?: number;
//     }
