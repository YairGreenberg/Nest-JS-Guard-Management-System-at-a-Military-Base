import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module'; //..
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
@Module({

  imports:[UsersModule,JwtModule.register({
    
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '72h'},
  }),
],
  providers: [AuthService, {
      provide: 'USERS_REPOSITORY',
      useValue: User
    }],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
