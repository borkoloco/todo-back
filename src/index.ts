import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos";
import connectDB from "./config/db";
import cors from "cors";
import { validate } from "./middleware/validate";
import { TodoSchema } from "./schemas/todo";
import { NextFunction, Request, Response } from "express";
import { swaggerSpec, swaggerUi } from "./swagger";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const corsOptions = {
  origin: CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); //
  res.status(500).json({
    error: "Something went wrong",
    message: err.message,
  });
});

app.post("/api/todos", validate(TodoSchema), (req, res) => {
  const todo = req.body;
  console.log("Saving todo:", todo);
  res.status(201).json({ message: "Todo created", todo });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export { app };
