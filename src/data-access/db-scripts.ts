import fs from 'fs'
import { Sequelize } from 'sequelize'

export const seeds = fs.readFileSync('src/data-access/UserTable.sql', 'utf8');
export const db = new Sequelize(process.env.DATABASE as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  omitNull: true,
  port: +process!.env!.DB_PORT!,
  dialectOptions: {
    multipleStatements: true
  }
});
