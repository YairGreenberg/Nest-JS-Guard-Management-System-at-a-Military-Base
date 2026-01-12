import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { Shift } from './entities/shift.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { DbModule } from 'src/db/db.module';

@Module({
    imports: [DbModule],
    controllers: [ShiftsController],
    providers: [ShiftsService,
        RolesGuard,
    {
        provide: 'SHIFTS_REPOSITORY',
        useValue: Shift,
    }]
})
export class ShiftsModule {}
