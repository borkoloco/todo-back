import { Router, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import Todo from "../models/todo";
import { validate } from "../middleware/validate";
import { TodoSchema } from "../schemas/todo";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const todos = await Todo.find({ userId });
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const todo = await Todo.findOne({ _id: req.params.id, userId });

      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
      }

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo operations
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new Todo
 *     description: Create a new Todo item.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the todo
 *                 example: "Buy groceries"
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  validate(TodoSchema),
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { title, status } = req.body;

    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const newTodo = new Todo({
        title,
        status: status || false,
        userId,
      });

      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validate(TodoSchema),
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );

      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
      }

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId });

      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
      }

      res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
