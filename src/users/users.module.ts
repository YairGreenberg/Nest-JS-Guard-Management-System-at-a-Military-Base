import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    }
  ],
  exports: [UsersService],
})
export class UsersModule {}
