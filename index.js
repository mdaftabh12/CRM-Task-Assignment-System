import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import "dotenv/config";
const app = express();

import userRoute from "./routes/userRoute.js";
import teamRoute from "./routes/teamRoute.js";
import projectRoute from "./routes/projectRoute.js";
import taskRoute from "./routes/taskRoute.js";

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DATA_BASE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.error(err));

app.use("/api", userRoute);
app.use("/api", teamRoute);
app.use("/api", projectRoute);
app.use("/api", taskRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
