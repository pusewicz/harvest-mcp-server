import { OAUTH_API_BASE_URL } from "./constants";

import { McpStreamableController } from "./controllers/mcp_streamable_controller";
import { OAuthController } from "./controllers/oauth_controller";

import { McpServer } from "./mcp/mcp_server";
import { McpAuthMiddleware } from "./middlewares/mcp_auth_middleware";
import { UserService } from "./services/user_service";

const userService = new UserService();

const mcpServer = new McpServer({
  userService,
});

export const mcpAuthMiddleware = new McpAuthMiddleware();

export const mcpStreamableController = new McpStreamableController({
  mcpServer,
});

export const oauthController = new OAuthController({
  oauthApiBaseUrl: OAUTH_API_BASE_URL,
});
