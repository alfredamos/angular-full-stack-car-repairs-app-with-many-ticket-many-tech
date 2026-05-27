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

export const isPublicRoute = (route: string) => publicRoutes.includes(route);