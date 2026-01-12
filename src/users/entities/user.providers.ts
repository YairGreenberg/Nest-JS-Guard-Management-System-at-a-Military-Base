import { User } from "src/db/entities/solid.entity";

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User
    }
]