import { Optional } from "sequelize";

export interface TypeAttributes {
  id: number;

  uuid: string;
  name: string;
  model: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface TypeInput
  extends Optional<
    TypeAttributes,
    "id" | "uuid" | "createdAt" | "updatedAt" | "deletedAt"
  > {}
export interface TypeOuput extends Required<TypeAttributes> {}
