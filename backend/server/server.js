const express = require("express");
require("colors");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("../config/db");
const { errorHandler } = require("../middleware/errorMiddleware");

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ===================================================== Auth Routes
app.use("/api", require("../routes/userRoute"));
app.use("/api/users", require("../routes/userRoute"));

// ===================================================== Blogs and Comments Routes
app.use("/api/blog", require("../routes/blogRoute"));

// ===================================================== Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`App listen on port => ${port}`));
