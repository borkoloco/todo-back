import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    console.log("Incoming Data:", req.body);
    const result = schema.safeParse(req.body);
    console.log("Validation Result:", result);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    req.body = result.data;
    console.log("Validated Data:", req.body);

    next();
  };
