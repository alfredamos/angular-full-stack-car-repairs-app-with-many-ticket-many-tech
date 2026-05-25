import {Role, type UserType} from "../generated/prisma/enums";
import {UserUncheckedUpdateInput} from "../generated/prisma/models/User";
import {EditUserProfile} from "../validations/auth.validation";

export function fromEditUserToUser(editUserProfile: EditUserProfile, id: string): UserUncheckedUpdateInput {

    return{
        id,
        name: editUserProfile?.name,
        email: editUserProfile?.email,
        phone: editUserProfile?.phone,
        password: editUserProfile?.password,
        role: editUserProfile?.role as Role,
        userType: editUserProfile?.userType as UserType,
        gender: editUserProfile?.gender,
        image: editUserProfile?.image,
        dateOfBirth: new Date(editUserProfile?.dateOfBirth),
    }
}
