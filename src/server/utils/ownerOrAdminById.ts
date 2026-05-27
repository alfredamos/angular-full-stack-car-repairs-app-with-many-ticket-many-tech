import {createError, H3Event} from "h3";
import {authService} from "../services/auth.service";
import {StatusCodes} from "http-status-codes";

export function ownerOrAdminById(event: H3Event, userId: string) {
    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Check if user is logged in.
    if (!session.isLoggedIn) {
        throw createError({statusCode: StatusCodes.UNAUTHORIZED, message: "You are not logged in."});
    }

    //----> Check if user is admin.
    if (!session.isAdmin && !isOwner(userId, session.id)) {
        throw createError({statusCode: StatusCodes.FORBIDDEN, message: "You are not permitted to view or perform this action."});
    }

    //----> User is admin.
    return session;
}

function isOwner(id: string, userId: string) {
    return id.normalize() === userId.normalize();
}