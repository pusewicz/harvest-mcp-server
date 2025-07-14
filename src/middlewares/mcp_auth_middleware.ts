import { NextFunction, Request, Response } from "express";

export interface McpAuthenticatedRequest extends Request {
  auth?: string;
}

export class McpAuthMiddleware {
  constructor() {
    this.requireAuth = this.requireAuth.bind(this);
  }

  public requireAuth(
    req: McpAuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      res.status(401).send("Unauthorized");
      return;
    }

    const token = req.headers.authorization.substring(7);

    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    req.auth = token;
    next();
  }
}
