import { Request } from "express";

const publicRoutes = [
   "/",
    "/login",
    "/logout",
    "/refresh",
    "/signup",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
    "/api/auth/signup",
]

export const isPublicRoute = (request: Request) => publicRoutes.includes(request.url);