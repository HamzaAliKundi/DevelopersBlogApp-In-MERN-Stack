const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

// =========================================================== ***Users Blogs Section*** ==============================================================
// =========================================================== ***Users Blogs Section*** ==============================================================

// =========================================================================== Get Blog [ PUBLIC ROUTE ]
const getBlogs = asyncHandler(async (req, res) => {
   const pageSize = 5;
   const page = parseInt(req.query.page || "0");
   const total = await Blog.countDocuments({});
   const blog = await Blog.find({})
      .limit(pageSize)
      .skip(pageSize * page);

   res.status(200).json({
      totalPages: Math.ceil(total / pageSize),
      blog,
   });
});

// =========================================================================== Post Blog [ PRIVATE ROUTE ]
const setBlog = asyncHandler(async (req, res) => {
   const blog = Blog.create({
      author: req.body.author,
      category: req.body.category,
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: req.body.image,
      user: req.user.id,
   });

   res.status(200).json(blog);
});

// =========================================================================== Put Blog [ Private ROUTE ]
const updateBlog = asyncHandler(async (req, res) => {
   const blog = await Blog.findById(req.params.id);

   if (!blog) {
      res.status(400);
      throw new Error("Blog not found");
   }

   if (!req.user) {
      res.status(401);
      throw new Error("User not found");
   }

   if (blog.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   res.status(200).json(updatedBlog);
});

// =========================================================================== Delete Blog [ PRIVATE ROUTE ]
const deleteBlog = asyncHandler(async (req, res) => {
   const blog = await Blog.findById(req.params.id);

   if (!blog) {
      res.status(400);
      throw new Error("Goal not found");
   }

   if (!req.user) {
      res.status(401);
      throw new Error("User not found");
   }

   if (blog.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   await blog.remove();
   res.status(200).json({ id: req.params.id });
});

// =========================================================================== Get Single Blog [ PUBLIC ROUTE ]
const getSingleBlog = asyncHandler(async (req, res) => {
   const blog = await Blog.findById(req.params.id);

   res.status(200).json(blog);
});

// =========================================================== ***Users Comment Section*** ==============================================================
// =========================================================== ***Users Comment Section*** ==============================================================

// =========================================================================== Get Blog Comment [ PUBLIC ROUTE ]
const getBlogComments = asyncHandler(async (req, res) => {
   const comment = await Comment.find({ blogId: req.params.id });

   res.status(200).json(comment);
});

// =========================================================================== Post Blog Comment [ PRIVATE ROUTE ]
const setBlogComments = asyncHandler(async (req, res) => {
   const { blogId, author, comment } = req.body;

   if (!blogId || !author || !comment) {
      res.status(400);
      throw new Error("Please add all fields");
   }

   const userComment = await Comment.create({
      blogId: req.body.blogId,
      author: req.body.author,
      comment: req.body.comment,
      user: req.user.id,
   });

   res.status(200).json(userComment);
});

// =========================================================================== Delete Blog Comment [ PRIVATE ROUTE ]
const deleteBlogComment = asyncHandler(async (req, res) => {
   const comment = await Comment.findById(req.params.id);

   if (!comment) {
      res.status(400);
      throw new Error("Comment not found");
   }

   if (!req.user) {
      res.status(401);
      throw new Error("User not found");
   }

   if (comment.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   await comment.remove();
   res.status(200).json({ id: req.params.id });
});

// =========================================================================== Update Blog Comment [ PRIVATE ROUTE ]
const updateComment = asyncHandler(async (req, res) => {
   const comment = await Comment.findById(req.params.id);

   if (!comment) {
      res.status(400);
      throw new Error("Blog not found");
   }

   if (!req.user) {
      res.status(401);
      throw new Error("User not found");
   }

   if (comment.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
      }
   );

   res.status(200).json(updatedComment);
});

// =========================================================================== Get Single Comment for Updating [ PRIVATE ROUTE ]
const getSingleComment = asyncHandler(async (req, res) => {
   const singleComment = await Comment.findById(req.params.id);

   res.status(200).json(singleComment);
});

// =========================================================== ***User Profile Blog Section*** ==========================================================
// =========================================================== ***User Profile Blog Section*** ==========================================================

// =========================================================================== Get User Profile Blogs [ Private ROUTE ]
const getUsersProfileBlogs = asyncHandler(async (req, res) => {
   const PAGE_SIZE = 2;
   const page = parseInt(req.query.page || "0");
   const total = await Blog.countDocuments({ user: req.params.id });
   const blog = await Blog.find({ user: req.params.id })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
   res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE + 1),
      total,
      blog,
   });
});

// =========================================================== ***Filtered Blogs Section*** ==============================================================
// =========================================================== ***Filtered Blogs Section*** ==============================================================

// =========================================================================== Get Filtered Blogs [ Public || Private ROUTE ]

const getFilteredBlogs = asyncHandler(async (req, res) => {
   const categoryItem = req.params.category;

   let query = {};

   if (req.params.category !== "allBlogs") {
      query = { category: categoryItem };
   }

   // if (categoryItem === "allBlogs") {
   const pageSize = 5;
   const page = parseInt(req.query.page || "0");
   const filteredBlogs = await Blog.find(query)
      .limit(pageSize)
      .skip(pageSize * page);

   const total = await Blog.count(query);

   return res.status(200).json({
      totalPages: Math.ceil(total / pageSize),
      totalDocuments: total,
      filteredBlogs,
   });
   // } else {
   //    const pageSize = 5;
   //    const page = parseInt(req.query.page || "0");
   //    console.log(`Total Blog for ${categoryItem} category is :`, total);

   //    const filteredBlogs = await Blog.find({ category: categoryItem })
   //       .limit(pageSize)
   //       .skip(pageSize * page);

   //    return res.status(200).json({
   //       // totalPages: Math.ceil(total / pageSize),
   //       // totalDocuments: total,
   //       filteredBlogs,
   //    });
   // }
});

// ============================ Exporting Functions
module.exports = {
   setBlog,
   getBlogs,
   deleteBlog,
   updateBlog,
   getSingleBlog,
   updateComment,
   getBlogComments,
   setBlogComments,
   getFilteredBlogs,
   getSingleComment,
   deleteBlogComment,
   getUsersProfileBlogs,
};
