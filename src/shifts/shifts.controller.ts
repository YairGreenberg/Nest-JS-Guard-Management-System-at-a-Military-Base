import { Controller, Post, Body, Get ,UseGuards} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { AuthGuard } from '../auth/guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
@Controller('shifts')
@UseGuards(AuthGuard,RolesGuard)
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) {}

    @Post()
    @Roles(Role.Admin,Role.SuperAdmin)      
    create(@Body() createShiftDto: CreateShiftDto) {
        return this.shiftsService.create(createShiftDto);
    }
    @Get()
    findAll() {
        return this.shiftsService.findAll();
    }
}