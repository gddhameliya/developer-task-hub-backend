import path from "path";
import dotenv from "dotenv";

// const envPath = path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`);
// dotenv.config({ path: envPath });

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === "test" ? ".test.env" : ".env"),
});

//* Add your database configuration here.
export default {
  //* Database Configuration for development
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    schema: process.env.DB_SCHEMA,
    dialect: "postgres",
    logging: false,
    freezeTableName: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },

  //* Database Configuration for test
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    schema: process.env.DB_SCHEMA,
    dialect: "postgres",
    logging: false,
    freezeTableName: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },

  //* Database Configuration for production
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    schema: process.env.DB_SCHEMA,
    dialect: "postgres",
    logging: false,
    freezeTableName: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
