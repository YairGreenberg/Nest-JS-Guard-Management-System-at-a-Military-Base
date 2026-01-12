import { IsString ,IsDateString} from 'class-validator';

export class CreateShiftDto {
    @IsString()
    location: string;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string
}