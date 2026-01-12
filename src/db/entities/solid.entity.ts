import { Table,Column ,Model } from "sequelize-typescript";




@Table
export class User extends Model {
    @Column
    Id: number;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    role:string

}