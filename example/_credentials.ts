import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, ".env") });

/** Helper function made only for the example. */
export const readCredentials = () => {
  const username = process.env.UNILIM_USERNAME;
  const password = process.env.UNILIM_PASSWORD;

  if (!username || !password) {
    throw new Error("You must provide UNILIM_USERNAME and UNILIM_PASSWORD in the demo .env file.");
  }

  return { username, password };
};
