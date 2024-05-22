import { IsNotEmpty, IsNumber, IsString, IsTimeZone} from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    type_activity: string;

    @IsNumber()
    @IsNotEmpty()
    day_activity: number;

    @IsTimeZone()
    @IsNotEmpty()
    time_activity: Time;

    @IsNumber()
    @IsNotEmpty()
    cost_activity: number;

    @IsString()
    @IsNotEmpty()
    province_activity: string;

    @IsString()
    @IsNotEmpty()
    description_activity: string;

    @IsNumber()
    @IsNotEmpty()
    surcharge_activity: number;
}