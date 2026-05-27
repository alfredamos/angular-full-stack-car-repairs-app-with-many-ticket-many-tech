import {defineEventHandler, sendRedirect} from "h3";
import {authService} from "../services/auth.service";
import {StatusCodes} from "http-status-codes";
import {isPublicRoute} from "../utils/publicRoute";

export default defineEventHandler(async (event) => {
    //----> Log the incoming request
    const route = event.node.req.originalUrl!;
    console.log(`Incoming request: ${event.method} ${route}`);

    //----> Get user session.
    const session = authService.getUserSession(event);

    if (!isPublicRoute(route) && !session?.isLoggedIn) {
        await sendRedirect(event, '/login', StatusCodes.UNAUTHORIZED);
    }
})