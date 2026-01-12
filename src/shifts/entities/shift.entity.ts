import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table
export class Shift extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endTime: Date;
}