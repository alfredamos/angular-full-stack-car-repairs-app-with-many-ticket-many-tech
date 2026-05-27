import {createError, H3Event} from "h3";
import {authService} from "../services/auth.service";
import {StatusCodes} from "http-status-codes";

function adminAuthorization(event: H3Event) {
    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Check if user is logged in.
    if (!session.isLoggedIn) {
        throw createError({statusCode: StatusCodes.UNAUTHORIZED, message: "You are not logged in."});
    }

    //----> Check if user is admin.
    if (!session.isAdmin) {
        throw createError({statusCode: StatusCodes.FORBIDDEN, message: "You are not permitted to view or perform this action."});
    }

    //----> User is admin.
    return session;
}