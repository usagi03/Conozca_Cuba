import { IsNotEmpty, /*IsObject,*/ IsOptional, IsString } from "class-validator";
//import { Role } from "src/modules/roles/roles.entity";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly user_name?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly user_password?: string;
    
    @IsString()
    @IsOptional()
    role?: string;
}