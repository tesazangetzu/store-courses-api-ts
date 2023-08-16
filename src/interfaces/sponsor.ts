import { Optional } from "sequelize";

export interface SponsorAttributes {
  id: number;
  uuid: string;
  title: string;
  imgUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SponsorInput
  extends Optional<
    SponsorAttributes,
    "id" | "uuid" | "createdAt" | "updatedAt" | "deletedAt"
  > {}
export interface SponsorOuput extends Required<SponsorAttributes> {}
