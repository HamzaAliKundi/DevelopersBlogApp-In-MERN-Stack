const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: "User",
      },
      author: {
         type: String,
         require: [true, "Pleas add an author"],
      },
      category: {
         type: Array,
         require: [true, "Please add a catogory"],
      },
      title: {
         type: String,
         require: [true, "Please add a title"],
      },
      subtitle: {
         type: String,
         require: [true, "Please add a sub-title"],
      },
      description: {
         type: String,
         require: [true, "Please add a descryption"],
      },
      image: {
         type: String,
         require: [true, "Plaese Add an Image"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Blog", blogSchema);
