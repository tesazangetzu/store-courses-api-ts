import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import { SkillAttributes, SkillInput } from "../interfaces/skill";

class Skill
  extends Model<SkillAttributes, SkillInput>
  implements SkillAttributes
{
  id!: number;
  uuid!: string;
  skillId!: number | null;
  name!: string;
  slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate() {
    Skill.hasMany(Skill, { foreignKey: "skillId", as: "children" });
    Skill.belongsTo(Skill, { foreignKey: "skillId", as: "parent" });
  }
}

Skill.init(
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
    skillId: {
      type: DataTypes.INTEGER,
      references: { model: "skills", key: "id" },
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

Skill.associate();

export default Skill;
