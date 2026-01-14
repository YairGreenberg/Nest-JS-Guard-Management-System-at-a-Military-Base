import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Param,
  Request,
  UseGuards,
  Res,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard, RolesGuard } from './guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.Dto';
import { log } from 'console';
import { Roles } from './roles.decorator';
import { Role } from 'src/users/enums/role.enum';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private userService: UsersService
  ) {}
  // @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: any) {
    console.log('Body received:', body);
    return this.authService.signIn(body.username, body.password);
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
    async register(@Body() rgisterDto:RegisterDto ) {
      return this.authService.register(rgisterDto);
      
    }
    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard) 
    @Roles(Role.Admin) 
    remove(@Param('id') id: string) {
    return this.userService.remove(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard, RolesGuard) 
    @Roles(Role.Admin) 
    async updateUser(@Param('id') id: string, @Body() updateData: any) {
      return this.userService.update(+id, updateData);
    }

    @Get('all') 
    async getAllUsers() {
      return this.userService.findAll();
    }
}
