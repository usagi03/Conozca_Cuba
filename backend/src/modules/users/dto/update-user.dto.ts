import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly user_name?: string;
    @IsOptional()
    @IsNotEmpty()
    readonly user_password?: string;
    @IsNumber()
    @IsOptional()
    readonly user_role?: number;
}