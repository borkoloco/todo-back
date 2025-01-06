import { Request, Response, NextFunction } from "express";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
require("dotenv").config();

export interface AuthenticatedRequest extends Request {
  auth?: { sub: string };
  userId?: string;
}

export const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as jwksRsa.GetVerificationKey,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
  getToken: (req: Request) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No authorization token found");
    }
    return token;
  },
});

const attachUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.auth && req.auth.sub) {
    req.userId = req.auth.sub;
    return next();
  }
  return res.status(401).json({ message: "Invalid token or missing user ID" });
};

export default [authMiddleware, attachUser];
