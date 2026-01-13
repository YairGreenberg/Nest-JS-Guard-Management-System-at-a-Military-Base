import { BadRequestException, Injectable ,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService,
        // private userRepository: typeof User
    ){}

    async register(registerDto: RegisterDto){
        const existingUser = await this.userService.findOne(registerDto.username);
        if(existingUser){
            throw new BadRequestException("username invlid")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.password,salt);
        const newUser = await this.userService.create({
            username: registerDto.username,
            password: hashedPassword,
            email: registerDto.email,
            role: registerDto.role
        });
        const payload = {sub: newUser.id,
            username: newUser.username, role: newUser.role
        };
        return {message: 'user created',user: {id:newUser.id,username:newUser.username, email: newUser.email},access_token: await this.jwtService.signAsync(payload)}
        
        // const { password, ...result } = newUser.get({ plain: true });
        // return result;
    }
    //   async findAll(): Promise<User[]>{
    //         return this.userRepository.findAll<User>()
    //     }

    async signIn(username: string, pass: string):Promise <{access_token:string}>{
        const user = await this.userService.findOne(username);
        if(!user || !(await bcrypt.compare(pass,user.password))){

            throw new UnauthorizedException("username or password is incorrect");

        }

        const payload = {sub: user.id,
             username:user.username,
             role:user.role
            };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
