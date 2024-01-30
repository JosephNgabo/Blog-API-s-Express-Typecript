import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import Post from "../../models/post";

router.post(
  "/api/post/update:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      const error = new Error("Please input your post id") as CustomError;
      error.status = 400;
      return next(error);
    }
    let updatePost;

    try {
      updatePost = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { title, content } },
        { new: true }
      );
    } catch (err) {
      const error = new Error("Post is not updated!") as CustomError;
      error.status = 400;
      return next(error);
    }
    res.status(201).send(updatePost).json("Post updated successfully");
  }
);
export { router as updatePostRouter };
