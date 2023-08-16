import Skill from "../models/skills";
import { Op } from "sequelize";
import { v4 } from "uuid";
import { Slugify } from "../helpers/slugify";
import { SkillArr } from "../helpers/attributes";
import { SkillInput, SkillOuput } from "../interfaces/skill";

const include = [
  { model: Skill, as: "children", attributes: SkillArr },
  { model: Skill, as: "parent", attributes: SkillArr },
];

export default class SkillRepository {
  static getAll(data: any): Promise<SkillOuput[]> {
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

    return Skill.findAll({
      attributes: SkillArr,
      where: { ...where },
      include,
      order: [["id", order || "asc"]],
      offset: page ? --page * limit : undefined,
      limit,
    });
  }

  static async show(uuid: string): Promise<SkillOuput> {
    return (await Skill.findOne({
      where: { uuid },
      attributes: SkillArr,
      include,
    }))!;
  }

  static showWithAll(uuid: string) {
    return Skill.findOne({ where: { uuid } });
  }

  static async create(payload: SkillInput): Promise<SkillOuput> {
    payload.uuid = v4();
    payload.slug = Slugify(payload.name);
    const item = await Skill.create(payload);
    return (await Skill.findOne({
      where: { uuid: item.uuid },
      attributes: SkillArr,
      include,
    }))!;
  }

  static async update({
    uuid,
    payload,
  }: {
    uuid: string;
    payload: SkillInput;
  }): Promise<SkillOuput> {
    payload.slug = Slugify(payload.name);
    await Skill.update(payload, { where: { uuid } });
    return (await Skill.findOne({
      where: { uuid },
      attributes: SkillArr,
      include,
    }))!;
  }

  static delete(uuid: string) {
    return Skill.destroy({ where: { uuid } });
  }
}
