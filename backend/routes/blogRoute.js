const express = require("express");
const router = express.Router();
const {
   setBlog,
   getBlogs,
   updateBlog,
   deleteBlog,
   getSingleBlog,
   updateComment,
   getBlogComments,
   setBlogComments,
   getSingleComment,
   getFilteredBlogs,
   deleteBlogComment,
   getUsersProfileBlogs,
} = require("../controller/blogController");

const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multerMiddleware");

// ========================================================================================================= Users Blogs Routes
router.route("/").get(getBlogs).post(protect, upload.single("image"), setBlog);
router.route("/:id").put(protect, updateBlog).delete(protect, deleteBlog);
router.route("/:id").get(getSingleBlog);

// ========================================================================================================== Users Comments Routes
router.route("/comments").post(protect, setBlogComments);

router
   .route("/comments/:id")
   .get(getBlogComments)
   .delete(protect, deleteBlogComment)
   .put(protect, updateComment);
// ====================================================================================== GET getting single comment for Update
router.route("/comments/singlecomment/:id").get(protect, getSingleComment);

// ====================================================================================== GET Users Profile Blogs
router.route("/userprofileblogs/:id").get(protect, getUsersProfileBlogs);

// ====================================================================================== GET Filtered Blogs
router.route("/getfilteredblog/:category").get(getFilteredBlogs);

module.exports = router;
