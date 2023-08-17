import { Op } from "sequelize";
import { v4 } from "uuid";
import { TypeInput, TypeOuput } from "../interfaces/type";
import { TypeArr } from "../helpers/attributes";
import Type from "../models/types";

export default class TypeRepository {
  static getAll(data: any): Promise<TypeOuput[]> {
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

    return Type.findAll({
      attributes: TypeArr,
      where: { ...where },
      order: [["id", order || "asc"]],
      offset: page ? --page * limit : undefined,
      limit,
    });
  }

  static async show(uuid: string): Promise<TypeOuput> {
    return (await Type.findOne({
      where: { uuid },
      attributes: TypeArr,
    }))!;
  }

  static showWithAll(uuid: string) {
    return Type.findOne({ where: { uuid } });
  }

  static async create(payload: TypeInput): Promise<TypeOuput> {
    payload.uuid = v4();
    const item = await Type.create(payload);
    return (await Type.findOne({
      where: { uuid: item.uuid },
      attributes: TypeArr,
    }))!;
  }

  static async update({
    uuid,
    payload,
  }: {
    uuid: string;
    payload: TypeInput;
  }): Promise<TypeOuput> {
    await Type.update(payload, { where: { uuid } });
    return (await Type.findOne({
      where: { uuid },
      attributes: TypeArr,
    }))!;
  }

  static delete(uuid: string) {
    return Type.destroy({ where: { uuid } });
  }
}
