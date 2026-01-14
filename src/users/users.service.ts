import { Injectable ,Inject,NotFoundException} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { Not } from 'sequelize-typescript';



@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: typeof User,
    ){}
    async findAll(): Promise<User[]>{
        return this.userRepository.findAll<User>()
    }

    async findOne(username:string):Promise < User | null>{
        return this.userRepository.findOne <User>({ where: { username } });
    }

    async create(userData: any): Promise<User> {  
        return this.userRepository.create<User>(userData);
    }
    async update(id: number, updateData: any) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');

        }
        return await user.update(updateData); 
    }
    async remove(id: number){
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    }
    delete(id: number){
         return this.userRepository.destroy({ where: { id: id } })
    }
    
}
