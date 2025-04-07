import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import DBconnection from "./database/db.js";
import router from "./routes/routes.js";
// import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
     cors({
          origin: "*",
          credentials: true,
     })
);

app.get("/", (req, res) => {
     return res.status(200).json({
          message: "Server is running...",
          success: true,
     });
});

// Use routes
app.use("/api", router);


const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
     try {
          await DBconnection()
          console.log(`Server is listening on port ${PORT}`);
     } catch (error) {
          console.error("Failed to start server:", error);
     }
});