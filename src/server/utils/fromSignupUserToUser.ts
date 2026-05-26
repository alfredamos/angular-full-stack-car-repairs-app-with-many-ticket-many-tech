import {Role, UserType} from "../../generated/prisma/enums";
import {SignupUser} from "../validations/auth.validation";
import {UserCreateInput} from "../../generated/prisma/models/User";

export function fromSignupUserToUser(signupUser: SignupUser):UserCreateInput{
    return{
        name: signupUser?.name,
        email: signupUser?.email,
        phone: signupUser?.phone,
        password: signupUser?.password,
        role: Role.User,
        userType: signupUser?.userType || UserType.Technician,
        gender: signupUser?.gender,
        image: signupUser?.image,
        dateOfBirth: new Date(signupUser?.dateOfBirth),
    }
}
