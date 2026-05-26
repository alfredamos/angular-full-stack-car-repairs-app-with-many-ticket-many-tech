import {UserDto} from "../../models/userDto.model";

export interface IUserService {
    deleteUserById(id: string): Promise<UserDto>;
    getAllUsers(): Promise<UserDto[]>;
    getUserById(id: string): Promise<UserDto>;
    getUserByEmail(email: string): Promise<UserDto>;
}