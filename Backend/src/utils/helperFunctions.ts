import { AuthRequest } from "../config/config.types";

export function getAuthenticatedUserId(req: AuthRequest): number {
  if (!req.user) {
    throw new Error("Authenticated user not found on request");
  }

  return Number(req.user.id);
}