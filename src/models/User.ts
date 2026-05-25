import {Gender, Role, UserType} from "../generated/prisma/enums"

export class User{
  id: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  gender:   Gender = Gender.Male;
  role: Role = Role.User;
  userType: UserType = UserType.Customer
  image: string = "";
  dateOfBirth: Date = new Date();
}
