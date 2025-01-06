import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  status: boolean;
  userId: string;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
