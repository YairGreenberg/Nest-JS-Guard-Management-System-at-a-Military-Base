import { Controller, Post, Body, Get, Delete, Param, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() rgisterDto: RegisterDto) {
    return this.usersService.create(rgisterDto);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
//  @Delete('delete')
//  async delete(
//     @Body() authenticateRequest: { password: string; email: string},

//  ){
//     try{
//         return await this.authService.deleteUser(authenticateRequest);
//     }catch(err){
//         throw new BadRequestException(err.message)
//     }
//  }
}
