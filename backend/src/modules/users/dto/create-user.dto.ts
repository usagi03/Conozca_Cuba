import { IsNotEmpty, /*IsObject,*/ IsString } from "class-validator";
//import { Role } from "src/modules/roles/roles.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    user_password: string;

    @IsString()
    @IsNotEmpty()
    role?: string;
}
