import { Sequelize, DataTypes, Model } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public isActive!: boolean;

    static associate(models: any) {
      User.hasMany(models.task, {
        foreignKey: "developerId",
        as: "tasks",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "User ID",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "User name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "User email",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "User password",
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "User role",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: "User active status",
      },
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  return User;
};
