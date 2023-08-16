import { Optional } from "sequelize";

export interface CourseAttributes {
  id: number;
  uuid: string;

  sponsorId: number;
  typeId: number;
  code: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  duration: string | null;
  access: string | null;
  imgUrl: string | null;
  deepLinkUrl: string | null;
  pla: string | null;
  credlyId: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CourseInput
  extends Optional<
    CourseAttributes,
    | "id"
    | "uuid"
    | "slug"
    | "imgUrl"
    | "deepLinkUrl"
    | "pla"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}
export interface CourseOuput extends Required<CourseAttributes> {}
