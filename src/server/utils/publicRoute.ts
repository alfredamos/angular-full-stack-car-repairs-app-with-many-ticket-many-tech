const publicRoutes = [
   "/",
    "/customers",
    "/login",
    "/logout",
    "/refresh",
    "/technicians",
    "/signup",
    "/api/customers",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
    "/api/technicians",
    "/api/auth/signup",
]

export const isPublicRoute = (route: string) => publicRoutes.includes(route);