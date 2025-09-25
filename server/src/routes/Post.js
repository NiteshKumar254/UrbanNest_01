
import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  getRelatedPostController,
  searchProductController,
  updatePostController,
  getPostsByCityController,
  getPostsByLocationController,
} from "../controller/Post.js";

const router = express.Router();


router.post("/create-post", createPostController);
router.get("/get-post/:slug", getPostController);
router.get("/get-all-posts", getAllPostsController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id", deletePostController);
router.get("/related-post/:pid/:cid", getRelatedPostController);
router.get("/search/:keyword", searchProductController);


router.get("/get-posts-by-city/:city", getPostsByCityController);
router.get("/get-posts-by-location/:state/:city", getPostsByLocationController);

export default router;
