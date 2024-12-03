import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

import { app, server } from "./lib/socket.js";
import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const port = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
