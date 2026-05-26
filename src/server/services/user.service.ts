import {IUserService} from "./IUser.service";
import {prisma} from "../db/prisma.db";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";
import {fromUserToUserDto, UserDto} from "../../models/userDto.model";

class UserService implements IUserService {
    async deleteUserById(id: string): Promise<UserDto> {
        //----> Check for user existence.
        await this.getOneUser(id);

        //----> Delete the user.
        const deletedUser = await prisma.user.delete({where: {id}});

        //----> Return deleted user.
        return fromUserToUserDto(deletedUser);
    }

    async getAllUsers(): Promise<UserDto[]> {
        //----> Fetch all users from database.
        const users = await prisma.user.findMany();

        //----> Return users.
        return users.map(user => fromUserToUserDto(user));
    }

    async getUserById(id: string): Promise<UserDto> {
        //----> Fetch user with the giving id from database.
        const user = await this.getOneUser(id);

        //----> Send back response.
        return fromUserToUserDto(user);
    }

    async getUserByEmail(email: string): Promise<UserDto> {
        //----> Fetch user with the giving id from database.
        const user = await prisma.user.findUnique({where: {email}});

        //----> Check for user existence.
        if(!user) throw createError({statusText:"User not found.", statusCode: StatusCodes.NOT_FOUND});

        //----> Send back response.
        return fromUserToUserDto(user);

    }

    private async getOneUser(id: string) {
        //----> Fetch user with the giving id from database.
        const user = await prisma.user.findUnique({where: {id}});

        //----> Check for user existence.
        if(!user) throw createError({statusText:"User not found.", statusCode: StatusCodes.NOT_FOUND});

        //----> Return user.
        return user;
    }
}

export const userService = new UserService();