import { Injectable, Inject, BadRequestException,NotFoundException } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { User } from 'src/users/entities/user.entity';
import { Shift } from 'src/shifts/entities/shift.entity';

@Injectable()
export class AssignmentsService {
    constructor(
        @Inject('ASSIGNMENTS_REPOSITORY')
        private assignmentRepository: typeof Assignment,
        @Inject('USERS_REPOSITORY')
        private userRepository: typeof User,
        @Inject('SHIFTS_REPOSITORY')
        private shiftRepository: typeof Shift,
    ){}
    async create(createAssignmentDto: CreateAssignmentDto) {
        const {userId, shiftId} = createAssignmentDto;
        const user = await this.userRepository.findByPk(userId);
        if(!user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        const shift = await this.shiftRepository.findByPk(shiftId);
        if(!shift){
            throw new NotFoundException(`Shift with id ${shiftId} not found`);
        }
        const existing = await this.assignmentRepository.findOne({
            where: { userId, shiftId },
        });
        if (existing) {
            throw new BadRequestException('Assignment already exists');
        }
        return this.assignmentRepository.create(createAssignmentDto as any);
    }
    async findAll() {
        return this.assignmentRepository.findAll({include: [{ model: User, attributes:['username','email'] }, {model:Shift}]});
    }

    async findMyShifts(userId: number) {
        return this.assignmentRepository.findAll({
            where: { userId },
            include: [{ model: Shift,
                attributes: ['date', 'startTime', 'endTime', 'location']
            }],
        });
    }
}