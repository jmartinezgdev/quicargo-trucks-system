import { Sequelize } from 'sequelize';
import * as path from 'path';
import { NODE_ENV } from '../env';
const config = require(path.join(__dirname, '../db/config.js'))[NODE_ENV];
const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };