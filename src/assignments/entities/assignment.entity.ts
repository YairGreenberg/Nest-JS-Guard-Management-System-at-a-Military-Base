import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';

@Table
export class Assignment extends Model {
    @ForeignKey(() => User)

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => Shift)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    shiftId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Shift)
    shift: Shift;
}