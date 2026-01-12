import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from '../enums/role.enum';
import { validate } from 'class-validator';

@Table
export class User extends Model {
    @Column({   
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
    })
    role: Role;


}