import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AppController } from './app.controller';
import { MiddlewareModule } from './middleware/middleware.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [
    AssignmentsModule,
    ShiftsModule,
    UsersModule,
    AuthModule,
    MiddlewareModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
