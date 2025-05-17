import type { Game } from "../types";
import { makeRequest } from "./utils/makeRequest";

export async function getConfig() {
  const config = await makeRequest<Game>(
    "/api/interview.mock.data/payload.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!config) {
    throw new Error("Failed to fetch game config");
  }
  if (config.activities.length === 0) {
    throw new Error("Game config is empty");
  }
  if (config.activities[0].questions.length === 0) {
    throw new Error("Game config has no questions");
  }

  return config;
}
