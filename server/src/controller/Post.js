

import cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js";
import slug from "slugify";
import mongoose from "mongoose";

// CREATE POST
export const createPostController = async (req, res) => {
  try {
    const {
      title,
      hotelLocation,
      description,
      category,
      availableBeds,
      price,
      gender,
      nearArea,
      facilities,
      ownerName,
      ownerContactNumber,
      state,
      city,
    } = req.body;

    const files = req.files?.images;

    // validation
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !files ||
      !availableBeds ||
      !price ||
      !gender ||
      !ownerName ||
      !nearArea ||
      !facilities ||
      !category ||
      !state ||
      !city
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

   


    // ✅ At least 3, max 5 images allowed
    if (!files || files.length < 3) {
      return res
        .status(400)
        .json({ message: "Please upload at least 3 images." });
    }
    if (files.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload a maximum of 5 images." });
    }

    // upload images
    const imageUrls = await Promise.all(
      files.map((file) =>
        cloudinary.uploader
          .upload(file.tempFilePath)
          .then((result) => result.secure_url)
      )
    );

    const newPost = new Post({
      title,
      hotelLocation,
      description,
      facilities: Array.isArray(facilities) ? facilities : [facilities],
      nearArea: Array.isArray(nearArea) ? nearArea : [nearArea],
      category,
      gender,
      availableBeds,
      price,
      ownerName,
      ownerContactNumber,
      images: imageUrls,
      state,
      city,
      slug: slug(title, { lower: true }),
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// GET SINGLE POST
export const getPostController = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "category"
    );

    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting post",
      error,
    });
  }
};

// GET ALL POSTS
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting all posts",
      error,
    });
  }
};

// UPDATE POST
export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      availableBeds,
      gender,
      price,
      ownerName,
      ownerContactNumber,
      state,
      city,
    } = req.body;

    const files = req.files?.images;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // handle images
    let updatedImages = post.images;
    if (files && files.length > 0) {
      if (files.length < 3) {
        return res
          .status(400)
          .json({ message: "Please upload at least 3 images." });
      }
      if (files.length > 5) {
        return res
          .status(400)
          .json({ message: "You can upload a maximum of 5 images." });
      }

      // delete old images
      await Promise.all(
        post.images.map((url) => {
          const publicId = url.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        })
      );

      // upload new ones
      updatedImages = await Promise.all(
        files.map((file) =>
          cloudinary.uploader
            .upload(file.tempFilePath)
            .then((result) => result.secure_url)
        )
      );
    } 

    // update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(hotelLocation && { hotelLocation }),
        ...(description && { description }),
        ...(facilities && {
          facilities: Array.isArray(facilities) ? facilities : [facilities],
        }),
        ...(nearArea && { nearArea: Array.isArray(nearArea) ? nearArea : [nearArea] }),
        ...(category && { category }),
        ...(availableBeds && { availableBeds }),
        ...(gender && { gender }),
        ...(ownerName && { ownerName }),
        ...(ownerContactNumber && { ownerContactNumber }),
        ...(price && { price }),
        ...(state && { state }),
        ...(city && { city }),
        ...(files && { images: updatedImages }),
        ...(title && { slug: slug(title, { lower: true }) }),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating post",
      error,
    });
  }
};

// DELETE POST
export const deletePostController = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting post",
      error,
    });
  }
};

// GET RELATED POSTS
export const getRelatedPostController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const relatedPost = await Post.find({
      category: cid,
      _id: { $ne: new mongoose.Types.ObjectId(pid) },
    })
      .limit(2)
      .populate("category");

    return res.status(200).send({
      success: true,
      message: "Related posts fetched successfully",
      relatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting related posts",
      error,
    });
  }
};

// SEARCH POSTS
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const words = keyword.split(" ");
    const regexString = words.join("|");

    const results = await Post.find({
      $or: [
        { title: { $regex: regexString, $options: "i" } },
        { city: { $regex: regexString, $options: "i" } },
        { state: { $regex: regexString, $options: "i" } },
        { hotelLocation: { $regex: regexString, $options: "i" } },
      ],
    }).select(
      "title hotelLocation images city state slug price gender facilities isAvailable"
    );

    res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while searching posts",
      error,
    });
  }
};

// GET POSTS BY CITY
export const getPostsByCityController = async (req, res) => {
  try {
    const { city } = req.params;

    const posts = await Post.find({
      city: new RegExp(city, "i"), // case-insensitive
    }).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: `Posts fetched successfully for city: ${city}`,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching posts by city",
      error,
    });
  }
};

// GET POSTS BY STATE + CITY
export const getPostsByLocationController = async (req, res) => {
  try {
    const { state, city } = req.params;

    const posts = await Post.find({
      state: new RegExp(state, "i"),
      city: new RegExp(city, "i"),
    }).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: `Posts fetched successfully for ${city}, ${state}`,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching posts by state + city",
      error,
    });
  }
};

