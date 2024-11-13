import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
import authRouter from "./routes/auth.router.js";
import taskRouter from "./routes/task.router.js";
import userRouter from "./routes/user.router.js";
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/users", userRouter);

export { app };
