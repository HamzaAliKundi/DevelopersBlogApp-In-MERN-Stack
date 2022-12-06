const mongoose = require("mongoose");

const commentModel = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: "User",
      },
      blogId: {
         type: String,
         require: [true, "Please add an id"],
      },
      author: {
         type: String,
         require: [true, "Please add author name"],
      },
      comment: {
         type: String,
         require: [true, "Please add comment"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Comment", commentModel);
