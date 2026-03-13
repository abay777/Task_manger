import { Request, Response, NextFunction } from "express";
import { error } from "node:console";
import { ZodType } from "zod";

declare module "express-serve-static-core" {
  interface Request {
    validated?: {
      body?: any;
      query?: any;
      params?: any;
    };
  }
}

export const validate =
  (schema: ZodType, source: "body" | "query" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = (req as any)[source] ?? {};

    const result = schema.safeParse(data);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => {
        const field = issue.path.join(".");
        return field ? `"${field}" ${issue.message}` : issue.message;
      });

      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Only replace body safely
    if (source === "body") {
      req.body = result.data;
    } else {
      req.validated = req.validated || {};
      req.validated[source] = result.data;
    }

    next();
  };
