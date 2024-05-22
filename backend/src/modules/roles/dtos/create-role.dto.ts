import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    readonly name_role: string;

    @IsString()
    @IsNotEmpty()
    readonly description_role: string;
}