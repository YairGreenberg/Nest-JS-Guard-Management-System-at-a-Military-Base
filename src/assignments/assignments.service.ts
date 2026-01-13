import { Injectable, Inject, BadRequestException,NotFoundException } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { User } from 'src/users/entities/user.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { Op } from 'sequelize';

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
        const hasOverlap =await this.checkOverlap(userId, shift.startTime, shift.endTime);
        if(hasOverlap){
            throw new BadRequestException('User has overlapping shift assignment');
        }
        return this.assignmentRepository.create(createAssignmentDto as any);
    }
    // async findAll() {
    //     return this.assignmentRepository.findAll({include: [{ model: User, attributes:['username','email'] }, {model:Shift}]});
    // }

    // async findMyShifts(userId: number) {
    //     return this.assignmentRepository.findAll({
    //         where: { userId },
    //         include: [{ model: Shift,
    //             attributes: ['date', 'startTime', 'endTime', 'location']
    //         }],
    //     });
    // }
    private async checkOverlap(userId: number, startTime: Date, endTime: Date): Promise<boolean> {
        const userAssignments = await this.assignmentRepository.findAll({
          where: { userId },
            include: [{
                model: Shift,
                where: {
                    [Op.or]: [
                        {
                            startTime: { [Op.between]: [startTime, endTime] }
                        },
                        {
                            endTime: { [Op.between]: [startTime, endTime] }
                        },
                    ]
                }
            }]
        });
        return !!userAssignments;//userAssignments.length > 0;  //!!overlap
    }
    async findMyShifts(userId: number){
        return this.assignmentRepository.findAll({
            where: {userId},
            include: [{ model: Shift}]
        })
    }
}




// import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
// import { Op } from 'sequelize'; // ייבוא אופרטורים של Sequelize
// // ... שאר הייבואים

// @Injectable()
// export class AssignmentsService {
//   // ... constructor

//   async create(createAssignmentDto: CreateAssignmentDto) {
//     const { userId, shiftId } = createAssignmentDto;

    // 1. בדיקת קיום חייל ושמירה (כפי שעשינו קודם)
//     const user = await this.usersRepository.findByPk(userId);
//     const newShift = await this.shiftsRepository.findByPk(shiftId);
    
//     if (!user) throw new NotFoundException('חייל לא נמצא');
//     if (!newShift) throw new NotFoundException('שמירה לא נמצאה');

//     // 2. בדיקה: האם לחייל יש כבר שמירה שחופפת בזמנים?
//     const hasOverlap = await this.checkOverlap(userId, newShift.startTime, newShift.endTime);
    
//     if (hasOverlap) {
//       throw new BadRequestException('לא ניתן לשבץ: לחייל יש שמירה אחרת בזמנים אלו');
//     }

//     // 3. אם הכל תקין - בצע את השיבוץ
//     return this.assignmentsRepository.create({ userId, shiftId } as any);
//   }

//   // פונקציית עזר לבדיקת חפיפה
//   private async checkOverlap(userId: number, startTime: Date, endTime: Date): Promise<boolean> {
//     const userAssignments = await this.assignmentsRepository.findAll({
//       where: { userId },
//       include: [{
//         model: Shift,
//         where: {
//           [Op.or]: [
//             {
//               // מקרה 1: השמירה החדשה מתחילה בתוך שמירה קיימת
//               startTime: { [Op.between]: [startTime, endTime] }
//             },
//             {
//               // מקרה 2: השמירה החדשה מסתיימת בתוך שמירה קיימת
//               endTime: { [Op.between]: [startTime, endTime] }
//             },
//             {
//               // מקרה 3: השמירה החדשה עוטפת שמירה קיימת
//               [Op.and]: [
//                 { startTime: { [Op.gte]: startTime } },
//                 { endTime: { [Op.lte]: endTime } }
//               ]
//             }
//           ]
//         }
//       }]
//     });

//     return userAssignments.length > 0;
//   }
// }



// async create(createShiftDto: CreateShiftDto) {
//   const start = new Date(createShiftDto.startTime);
//   const end = new Date(createShiftDto.endTime);

//   if (start >= end) {
//     throw new BadRequestException('זמן סיום השמירה חייב להיות אחרי זמן ההתחלה');
//   }

//   return this.shiftsRepository.create(createShiftDto as any);
// }