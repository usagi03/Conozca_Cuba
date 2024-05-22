import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    type_activity: string;

    @IsNumber()
    @IsNotEmpty()
    day_activity: number;

    @IsString()
    @IsNotEmpty()
    time_activity: string;

    @IsNumber()
    @IsNotEmpty()
    cost_activity: number;

    @IsString()
    @IsNotEmpty()
    province_activity: string;

    @IsString()
    description_activity: string;

    @IsNumber()
    @IsNotEmpty()
    surcharge_activity: number;
}