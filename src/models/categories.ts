import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import { CategoryAttributes, CategoryInput } from "../interfaces/category";

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number;
  public uuid!: string;
  public categoryId!: number | null;
  public name!: string;
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate() {
    Category.hasMany(Category, { foreignKey: "categoryId", as: "children" });
    Category.belongsTo(Category, { foreignKey: "categoryId", as: "parent" });
  }
}

Category.init(
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
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
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
    modelName: "Category",
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "categories",
  }
);

Category.associate();

export default Category;
