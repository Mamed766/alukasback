const bloglist = require("../models/BlogModel");
const { ErrorHandler } = require("../utils/ErrorHandler");
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await bloglist.find();
    if (!blogs.length) {
      return next(new ErrorHandler("No blogs found", 404));
    }
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await bloglist.findById(req.params.id);
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(new ErrorHandler("Invalid blog ID", 400));
  }
};
const createBlog = async (req, res) => {
  try {
    const { title, description, descriptionBody, createAt } = req.body;

    const uploadedFile = req.file;

    const newBlog = await bloglist.create({
      title,
      description,
      descriptionBody,
      createAt,
      image: uploadedFile ? uploadedFile.path : null,
    });

    return res.status(201).json({
      success: true,
      newBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await bloglist.findByIdAndDelete(req.params.id);
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    next(new ErrorHandler("Invalid blog ID", 400));
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, description, descriptionBody, createAt } = req.body;

    const uploadedFile = req.file;

    const updatedBlog = await bloglist.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        descriptionBody,
        createAt,
        image: uploadedFile ? uploadedFile.path : null,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return next(new ErrorHandler("Blog not found", 404));
    }

    res.status(200).json({ success: true, updatedBlog });
  } catch (error) {
    next(new ErrorHandler("Invalid blog ID", 400));
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlog,
};
