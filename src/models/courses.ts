import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import { CourseAttributes, CourseInput } from "../interfaces/course";
import Sponsor from "./sponsors";
import Category from "./categories";
import Skill from "./skills";

class Course
  extends Model<CourseAttributes, CourseInput>
  implements CourseAttributes
{
  public id!: number;
  public uuid!: string;
  public sponsorId!: number;
  public typeId!: number;
  public code!: string;
  public title!: string;
  public slug!: string;
  public price!: number;
  public description!: string;
  public duration!: string | null;
  public access!: string | null;
  public imgUrl!: string | null;
  public deepLinkUrl!: string | null;
  public pla!: string | null;
  public credlyId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate() {
    Course.belongsTo(Sponsor);
    Course.belongsToMany(Category, { through: "category_course" });
    Course.belongsToMany(Skill, { through: "course_skill" });
  }
}

Course.init(
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
    sponsorId: {
      type: DataTypes.INTEGER,
      references: { model: "sponsors", key: "id" },
      defaultValue: null,
    },
    typeId: {
      type: DataTypes.INTEGER,
      references: { model: "types", key: "id" },
      defaultValue: null,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    description: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    access: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    imgUrl: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    deepLinkUrl: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    pla: {
      type: DataTypes.NUMBER,
      defaultValue: false,
    },
    credlyId: {
      type: DataTypes.NUMBER,
      defaultValue: false,
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
    modelName: "Course",
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "courses",
  }
);

Course.associate();

export default Course;
