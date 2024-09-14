const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/ConnectionDb");
const blogRouter = require("./routers/blogRouters");
const path = require("path");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

const PORT = process.env.PORT || 8080;

app.use("/api/v1/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
