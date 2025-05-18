import type { Game } from "../types";

export async function getConfig() {
  const response = await fetch("/api/interview.mock.data/payload.json", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch game config");
  }
  const configData = await response.json();
  if (!configData) {
    throw new Error("Failed to parse game config");
  }
  const config: Game = configData as Game;

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
