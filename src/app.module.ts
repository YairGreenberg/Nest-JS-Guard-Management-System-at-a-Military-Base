import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { ShiftsModule } from './shifts/shifts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AssignmentsModule, ShiftsModule, UsersModule, AuthModule, MiddlewareModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
