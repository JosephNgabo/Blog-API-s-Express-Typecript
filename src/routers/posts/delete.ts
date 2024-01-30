import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import Post from "src/models/post";

router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Please input your post id") as CustomError;
      error.status = 400;
      return next(error);
    }
    try {
      await Post.findOneAndDelete({ id: id });
    } catch (err) {
      next(new Error("Post is not deleted!"));
    }
    res.status(201).json("Post deleted successfully");
  }
);

export { router as deletePostRouter };
