import { Injectable ,Inject} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';



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
    delete(id: number){
         return this.userRepository.destroy({ where: { id: id } })
    }
    
}
