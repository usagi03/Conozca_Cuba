import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    user_name?: string;

    @IsOptional()
    @IsNotEmpty()
    user_password?: string;
    
    @IsString()
    @IsOptional()
    role?: string;
}