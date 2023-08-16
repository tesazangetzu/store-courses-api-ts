import { Op } from "sequelize";
import Category from "../models/categories";
import { CategoryArr } from "../helpers/attributes";
import { v4 } from "uuid";
import { Slugify } from "../helpers/slugify";
import { CategoryInput, CategoryOuput } from "../interfaces/category";

const include = [
  { model: Category, as: "children", attributes: CategoryArr },
  { model: Category, as: "parent", attributes: CategoryArr },
];

export default class CategoryRepository {
  static getAll(data: any): Promise<CategoryOuput[]> {
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

    return Category.findAll({
      attributes: CategoryArr,
      where: { ...where },
      include,
      order: [["id", order || "asc"]],
      offset: page ? --page * limit : undefined,
      limit,
    });
  }

  static async show(uuid: string): Promise<CategoryOuput> {
    return (await Category.findOne({
      where: { uuid },
      attributes: CategoryArr,
      include,
    }))!;
  }

  static showWithAll(uuid: string) {
    return Category.findOne({ where: { uuid } });
  }

  static async create(payload: CategoryInput): Promise<CategoryOuput> {
    payload.uuid = v4();
    payload.slug = Slugify(payload.name);
    const item = await Category.create(payload);
    return (await Category.findOne({
      where: { uuid: item.uuid },
      attributes: CategoryArr,
      include,
    }))!;
  }

  static async update({
    uuid,
    payload,
  }: {
    uuid: string;
    payload: CategoryInput;
  }): Promise<CategoryOuput> {
    payload.slug = Slugify(payload.name);
    await Category.update(payload, { where: { uuid } });
    return (await Category.findOne({
      where: { uuid },
      attributes: CategoryArr,
      include,
    }))!;
  }

  static delete(uuid: string) {
    return Category.destroy({ where: { uuid } });
  }
}
