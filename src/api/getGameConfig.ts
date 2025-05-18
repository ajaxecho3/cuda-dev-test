import axios from "axios";
import type { Game } from "../types";
const base = "https://s3.eu-west-2.amazonaws.com";

const environment = import.meta.env.MODE;
export async function getConfig() {
  const response = await axios<Game>(
    `${environment === "production" ? base : "/api/"}/interview.mock.data/payload.json`,
    {
      method: "GET",
    },
  );

  return response.data;
}
