import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly user_name: string;
    @IsString()
    @IsNotEmpty()
    readonly user_password: string;
    @IsNumber()
    @IsNotEmpty()
    readonly user_role: number;
}
