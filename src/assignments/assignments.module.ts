import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { User } from '../users/entities/user.entity';
import { Shift } from '../shifts/entities/shift.entity';
import { DbModule } from '../db/db.module';

@Module({
    imports: [DbModule],
    controllers: [AssignmentsController],
    providers: [AssignmentsService,
        {
            provide: 'ASSIGNMENTS_REPOSITORY',
            useValue: Assignment,
        },
        {
            provide: 'USERS_REPOSITORY',
            useValue: User,
        },
        {
            provide: 'SHIFTS_REPOSITORY',
            useValue: Shift,
        }
    ]
})
export class AssignmentsModule {}
