import {UserDto} from "./userDto.model";
import {Gender, Role, UserType} from "../generated/prisma/enums";

export const emptyUserDto: UserDto = {
    id: "",
    name: "",
    email: "",
    phone: "",
    role: Role.User,
    userType: UserType.Customer,
    image: "",
    gender: Gender.Male,
    dateOfBirth: new Date(),
}