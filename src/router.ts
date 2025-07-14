import { json, Request, Response, Router } from "express";

import {
  mcpAuthMiddleware,
  mcpStreamableController,
  oauthController,
} from "./container";

export const router = Router();

// Health check.
router.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

// Streamable HTTP.
router.post(
  "/mcp",
  mcpAuthMiddleware.requireAuth,
  json(),
  mcpStreamableController.postMcp,
);
router.get(
  "/mcp",
  mcpAuthMiddleware.requireAuth,
  json(),
  mcpStreamableController.getMcp,
);
router.delete(
  "/mcp",
  mcpAuthMiddleware.requireAuth,
  json(),
  mcpStreamableController.deleteMcp,
);

// Auth-related.
router.get(
  "/.well-known/oauth-authorization-server",
  oauthController.getWellKnown,
);
