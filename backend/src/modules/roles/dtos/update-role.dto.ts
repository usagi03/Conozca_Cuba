import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
    @IsString()
    @IsOptional()
    readonly name_role?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly description_role?: string;
}