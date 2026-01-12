import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../users/enums/role.enum';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;


    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}