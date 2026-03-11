import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import type { Request } from "express";

describe("getAPIKey", () => {
  test("returns API key when Authorization header uses ApiKey format", () => {
    const req = {
      get: (headerName: string) => {
        if (headerName === "Authorization") {
          return "ApiKey my-secret-key";
        }
        return undefined;
      },
    } as Request;

    expect(getAPIKey(req)).toBe("my-secret-key");
  });

  test("trims extra whitespace around API key", () => {
    const req = {
      get: (headerName: string) => {
        if (headerName === "Authorization") {
          return "ApiKey    another-key   ";
        }
        return undefined;
      },
    } as Request;

    expect(getAPIKey(req)).toBe("another-key");
  });

  test("throws if Authorization header is missing", () => {
    const req = {
      get: () => undefined,
    } as Request;

    expect(() => getAPIKey(req)).toThrow();
  });

  test("throws if Authorization header does not start with ApiKey", () => {
    const req = {
      get: (headerName: string) => {
        if (headerName === "Authorization") {
          return "Bearer my-secret-key";
        }
        return undefined;
      },
    } as Request;

    expect(() => getAPIKey(req)).toThrow();
  });
});
