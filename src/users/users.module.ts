import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    }
  ],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
