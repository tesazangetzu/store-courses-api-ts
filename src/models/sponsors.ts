import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import { SponsorAttributes, SponsorInput } from "../interfaces/sponsor";

class Sponsor
  extends Model<SponsorAttributes, SponsorInput>
  implements SponsorAttributes
{
  public id!: number;
  public uuid!: string;
  public title!: string;
  public imgUrl!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate() {}
}

Sponsor.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: { type: DataTypes.STRING },
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
    modelName: "Sponsor",
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "sponsors",
  }
);

Sponsor.associate();

export default Sponsor;
