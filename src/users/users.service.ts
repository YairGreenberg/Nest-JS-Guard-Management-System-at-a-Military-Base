import { Injectable ,Inject } from '@nestjs/common';
// import {CreateUser}
// import { User } from 'src/db/entities/solid.entity';

export type User = any

@Injectable()
export class UsersService {
    private readonly Users = [
        {
        userId: 1,
        username: 'john',
        password: 'changeme', 
        },
        {
        userId: 2,
        username: 'maria',
        password: 'guess',
        },
    ];
    async findOne(username:string):Promise < User | undefined>{
        return this.Users.find(user => user.username === username);
    }
}
