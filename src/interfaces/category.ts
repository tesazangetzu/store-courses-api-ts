import { Optional } from "sequelize";

export interface CategoryAttributes {
  id: number;
  uuid: string;
  categoryId: number | null;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CategoryInput
  extends Optional<
    CategoryAttributes,
    "id" | "uuid" | "slug" | "createdAt" | "updatedAt" | "deletedAt"
  > {}
export interface CategoryOuput extends Required<CategoryAttributes> {}
