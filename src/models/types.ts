import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import { TypeAttributes, TypeInput } from "../interfaces/type";

class Type extends Model<TypeAttributes, TypeInput> implements TypeAttributes {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public model!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate() {}
}

Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Type",
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "types",
  }
);

Type.associate();

export default Type;
