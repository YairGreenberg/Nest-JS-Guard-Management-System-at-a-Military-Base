import { IsNumber,IsNotEmpty } from "class-validator";

export class CreateAssignmentDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    shiftId: number;
}