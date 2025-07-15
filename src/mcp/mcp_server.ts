import { McpServer as McpServerSdk } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport";

import { UserService } from "../services/user_service";

interface Options {
  userService: UserService;
}

interface ToolResponse {
  // Required to avoid TS error on node_modules/@modelcontextprotocol/sdk/dist/esm/types.d.ts:18703:9
  [x: string]: unknown;
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export class McpServer {
  private readonly userService: UserService;
  private server: McpServerSdk | null = null;

  constructor({ userService }: Options) {
    this.userService = userService;
    this.init();
  }

  public connect(transport: Transport) {
    if (!this.server) {
      throw new Error("MCP server not initialized");
    }

    return this.server.connect(transport);
  }

  private init() {
    this.server = new McpServerSdk({
      name: "Harvest MCP",
      version: "1.0.0",
    });

    this.server.tool(
      "get-my-user-id",
      "Get the user ID of the authenticated user",
      async ({ authInfo }) => {
        const user = await this.userService.getMe(authInfo.token);
        return this.respondWithJson({ userId: user?.id || null });
      },
    );
  }

  private respondWithText(text: string): ToolResponse {
    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
    };
  }

  private respondWithJson(json: unknown): ToolResponse {
    return this.respondWithText(JSON.stringify(json));
  }
}
