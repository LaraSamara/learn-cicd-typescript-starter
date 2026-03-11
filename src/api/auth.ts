import type { Request } from "express";

export function getAPIKey(req: Request): string {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  if (!authHeader.startsWith("ApiKey ")) {
    throw new Error("Invalid Authorization format");
  }

  const apiKey = authHeader.replace("ApiKey ", "").trim();

  if (!apiKey) {
    throw new Error("Missing API key");
  }

  return "";
}
