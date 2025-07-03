import { Sequelize, DataTypes, Model } from "sequelize";
import { enums } from "../common/constants";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Task extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public status!: string;
    public developerId!: string;
    public isActive!: boolean;

    static associate(models: any) {
      Task.belongsTo(models.user, {
        foreignKey: "developerId",
        as: "developer",
      });
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "Task ID",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Task title",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Task description",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: enums.TASK_STATUS.PENDING,
        allowNull: false,
        comment: "Task status",
      },
      developerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        comment: "Assigned Developer ID",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: "Task active status",
      },
    },
    {
      sequelize,
      modelName: "task",
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Task;
};
