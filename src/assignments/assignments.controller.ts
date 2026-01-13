import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AuthGuard } from '../auth/guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';


@Controller('assignments')
@UseGuards(AuthGuard, RolesGuard)
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) {}

    @Post()
    @Roles(Role.Admin, Role.SuperAdmin)
    create(@Body() createAssignmentDto: CreateAssignmentDto) {
        return this.assignmentsService.create(createAssignmentDto);
    }

    // @Get()
    // @Roles(Role.Admin, Role.SuperAdmin, Role.User)
    // findAll() {
    //     return this.assignmentsService.findAll();
    // }

    @Get('my-shifts')
    @Roles(Role.User, Role.Admin, Role.SuperAdmin)
    findMyShifts(@Req() req) {
        const userId = req.user.id;
        return this.assignmentsService.findMyShifts(userId);
    }
}