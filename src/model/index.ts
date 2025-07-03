/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";
import { Sequelize, DataTypes } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import process from "process";
import { logger } from "../common/utils/index";
const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || "development";
import dbConfig from "../config/db.config";
const config: { [key: string]: any } = dbConfig[env as "development" | "production" | "test"];

const db: {
  [key: string]: any;
} = {};

//* Conditionally create sequelize instance only if the environment is not 'test'
const sequelize = new Sequelize(config.database || "", config.username || "", config.password || undefined, {
  ...config,
  pool: {
    max: 15,
    min: 1,
    idle: 10000,
    acquire: 20000,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".ts" || file.slice(-3) === ".js");
  })
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//* Conditionally sync the database only if sequelize instance is defined
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     logger.info("Database & tables created!");
//   })
//   .catch((err: any) => {
//     console.log("🚀 ~ err:", err);
//     logger.error(`catch error in model/index.ts: ${err}`);
//   });

Object.assign(db, { sequelize });
Object.assign(db, { Sequelize });

export default db;
