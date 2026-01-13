import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './guard';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private userService: UsersService
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  findAll() {
    return [];
  }
    @Post('register') 
    async register(@Body() rgisterDto: any) {
      return this.authService.register(rgisterDto);
      
    }
  
    @Get('all') 
    async getAllUsers() {
      return this.userService.findAll();
    }
}
