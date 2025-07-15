import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types';
import { NextFunction, Request, Response } from "express";

export interface McpAuthenticatedRequest extends Request {
  auth?: AuthInfo;
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

    req.auth = {
      clientId: 'client-id', // Replace with actual client ID if available
      token,
      scopes: []
    };

    next();
  }
}
