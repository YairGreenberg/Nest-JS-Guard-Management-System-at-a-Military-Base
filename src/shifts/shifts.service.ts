import { Injectable, Inject } from '@nestjs/common';
import { Shift } from './entities/shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
    constructor(
        @Inject('SHIFTS_REPOSITORY')
        private shiftsRepository: typeof Shift,
    ) {}


    async create(createShiftDto: CreateShiftDto): Promise<Shift> {
        return this.shiftsRepository.create<Shift>(createShiftDto as any);
    }
    async findAll(): Promise<Shift[]> {
        return this.shiftsRepository.findAll<Shift>();
    }
}