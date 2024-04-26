import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Role } from "src/modules/roles/roles.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly user_name: string;

    @IsString()
    @IsNotEmpty()
    readonly user_password: string;

    @IsObject()
    @IsNotEmpty()
    readonly role: Partial<Role>;
}
