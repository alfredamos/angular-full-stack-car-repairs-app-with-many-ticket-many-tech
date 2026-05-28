import {Component, input, output, signal, SimpleChanges} from '@angular/core';
import {EditUserProfile} from "../../../../server/validations/auth.validation";
import {User} from "../../../../models/User";
import {email, form, FormField, required} from "@angular/forms/signals";
import {Gender} from "../../../../models/Gender.model";
import {UserType} from "../../../../models/UserType.model";
import {Role} from "../../../../models/Role.model";
import {formattedDate} from "../../../utils/formattedDate";

@Component({
  selector: 'app-edit-profile-form',
  imports: [
    FormField
  ],
  templateUrl: './edit-profile-form.html',
  styleUrl: './edit-profile-form.css',
})
export class EditProfileForm {
  user = input.required<User>()
  onEditProfile = output<EditUserProfile>();
  onBackToList = output<void>();

  editUserProfileModel = signal<EditUserProfile>({
    email: "",
    name: "",
    image: "",
    phone: "",
    password: "",
    gender: Gender.Male,
    dateOfBirth: "",
    userType: UserType.Customer,
    role: Role.User
  })

  editUserProfileForm = form(this.editUserProfileModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.name, {message: "Name is required"});
    required(schemaPath.image, {message: "Image is required"});
    required(schemaPath.password, {message: "Password is required"});
    required(schemaPath.phone, {message: "Phone is required"});
  })

  ngOnInit(){
    this.onLoadUser();
  }

  ngOnChanges (_changes: SimpleChanges){
    this.onLoadUser();
  }

  onLoadUser = () => {
    this.user();
    const editUserProfile = this.fromUserToEditProfileModel(this.user());
    this.editUserProfileModel.set(editUserProfile);
  }


  onSubmit=($event: Event)=> {
    $event.preventDefault()

    this.onEditProfile.emit(this.inputFromEditProfileForm(this.editUserProfileModel()));  }

  backToList() {
    this.onBackToList.emit()
  }

  fromUserToEditProfileModel(user : User): EditUserProfile{
    console.log("In edit-profile-form-component, user : ", user)
    const date = (user?.dateOfBirth)?.toString()?.split('T')[0]
    return {
      email: user?.email,
      gender: user?.gender,
      image: user?.image,
      password: "",
      phone: user?.phone,
      role: user?.role,
      userType: user?.userType,
      name: user?.name,
      dateOfBirth: formattedDate(new Date(date))
    }
  }

  inputFromEditProfileForm(request: EditUserProfile){
    return {
      email: request.email,
      gender: request.gender,
      image: request.image,
      password: request.password,
      phone: request.phone,
      role: request.role,
      name: request.name,
      userType: request?.userType,
      dateOfBirth: request?.dateOfBirth.toString()
    }
  }

  protected readonly Gender = Gender;
}
