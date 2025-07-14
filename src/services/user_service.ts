import { HARVEST_API_BASE_URL } from "../constants";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
}

export class UserService {
  public async getMe(token: string): Promise<User> | null {
    const url = `${HARVEST_API_BASE_URL}/v2/users/me`;

    console.log(`Fetching ${url} with ${token}`);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "Harvest MCP",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to fetch "${url}": ${response.statusText} - ${errorText}`,
        );
        return null;
      }

      const data = await response.json();

      return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        is_active: data.is_active,
      };
    } catch (error) {
      console.error(`Failed to fetch "${url}"`, error);
      return null;
    }
  }
}
