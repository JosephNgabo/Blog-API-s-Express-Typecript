import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import Comment from "../../models/comment";
import Post from "../../models/post";

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    if (!commentId || !postId) {
      const error = new Error(
        "Both post and comment Id are required"
      ) as CustomError;
      error.status = 400;
      return next(error);
    }
    try {
      await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
      next(new Error("Comment is not deleted!"));
    }
    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    res.status(201).json("Comment deleted successfully");
  }
);

export { router as deleteCommentRouter };
