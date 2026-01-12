import { Injectable ,Inject} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';


@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private userRepository: typeof User,
    ){}

    async findOne(username:string):Promise < User | null>{
        return this.userRepository.findOne <User>({ where: { username } });
    }

    async create(userData: any): Promise<User> {
        return this.userRepository.create(userData);
    }

        // private readonly Users = [
        //     {
        //     userId: 1,
        //     username: 'john',
        //     password: 'changeme', 
        //     role: Role.Admin
        //     },
        //     {
        //     userId: 2,
        //     username: 'maria',
        //     password: 'guess',
        //     role: Role.User
        //     },
        // ];
    // async findOne(username:string):Promise < User | undefined>{
    //     return this.userRepository.findOne <User>({ where: { username } });
    // }
}
