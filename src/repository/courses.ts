import { Op } from "sequelize";
import { v4 } from "uuid";
import { Slugify } from "../helpers/slugify";
import Course from "../models/courses";
import { CourseInput, CourseOuput } from "../interfaces/course";
import { CourseArr } from "../helpers/attributes";

// const include = [{}];

export default class CourseRepository {
  static getAll(data: any): Promise<CourseOuput[]> {
    let page, limit, order, where;
    ({ page, limit, order, ...where } = data);
    limit = parseInt(limit) || 10;
    page = parseInt(page);

    if (where.date)
      where.createdAt = {
        [Op.lt]: where.date.end,
        [Op.gt]: where.date.start,
      };
    delete where.date;

    return Course.findAll({
      attributes: CourseArr,
      where: { ...where },
      // include,
      order: [["id", order || "asc"]],
      offset: page ? --page * limit : undefined,
      limit,
    });
  }

  static async show(uuid: string): Promise<CourseOuput> {
    return (await Course.findOne({
      where: { uuid },
      attributes: CourseArr,
      // include,
    }))!;
  }

  static showWithAll(uuid: string) {
    return Course.findOne({ where: { uuid } });
  }

  static async create(payload: CourseInput): Promise<CourseOuput> {
    payload.uuid = v4();
    payload.slug = Slugify(payload.title);
    const item = await Course.create(payload);
    return (await Course.findOne({
      where: { uuid: item.uuid },
      attributes: CourseArr,
      // include,
    }))!;
  }

  static async update({
    uuid,
    payload,
  }: {
    uuid: string;
    payload: CourseInput;
  }): Promise<CourseOuput> {
    payload.slug = Slugify(payload.title);
    await Course.update(payload, { where: { uuid } });
    return (await Course.findOne({
      where: { uuid },
      attributes: CourseArr,
      // include,
    }))!;
  }

  static delete(uuid: string) {
    return Course.destroy({ where: { uuid } });
  }
}
