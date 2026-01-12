
import { Sequelize } from 'sequelize-typescript';
import { Shift } from '../shifts/entities/shift.entity';
import { User } from './entities/solid.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: "951753",
        database: 'solides',
      });
      sequelize.addModels([User, Shift,Assignment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
