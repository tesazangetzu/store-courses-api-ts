import { Optional } from "sequelize";

export interface SkillAttributes {
  id: number;
  uuid: string;
  skillId: number | null;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SkillInput
  extends Optional<
    SkillAttributes,
    "id" | "uuid" | "slug" | "createdAt" | "updatedAt" | "deletedAt"
  > {}
export interface SkillOuput extends Required<SkillAttributes> {}
