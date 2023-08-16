import Sponsor from "../models/sponsors";
import { Op } from "sequelize";
import { SponsorInput, SponsorOuput } from "../interfaces/sponsor";
import { SponsorAtrr } from "../helpers/attributes";
import { v4 } from "uuid";

export default class SponsorRepository {
  static getAll(data: any): Promise<SponsorOuput[]> {
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

    return Sponsor.findAll({
      attributes: SponsorAtrr,
      where: { ...where },
      order: [["id", order || "asc"]],
      offset: page ? --page * limit : undefined,
      limit,
    });
  }

  static async show(uuid: string): Promise<SponsorOuput> {
    return (await Sponsor.findOne({
      where: { uuid },
      attributes: SponsorAtrr,
    }))!;
  }

  static showWithAll(uuid: string) {
    return Sponsor.findOne({ where: { uuid } });
  }

  static async create(payload: SponsorInput): Promise<SponsorOuput> {
    payload.uuid = v4();
    const item = await Sponsor.create(payload);
    return (await Sponsor.findOne({
      where: { uuid: item.uuid },
      attributes: SponsorAtrr,
    }))!;
  }

  static async update({
    uuid,
    payload,
  }: {
    uuid: string;
    payload: SponsorInput;
  }): Promise<SponsorOuput> {
    const uItem = await Sponsor.update(payload, { where: { uuid } });
    if (!uItem) throw new Error("Sponsor not funded");
    return (await Sponsor.findOne({
      where: { uuid },
      attributes: SponsorAtrr,
    }))!;
  }

  static delete(uuid: string) {
    return Sponsor.destroy({ where: { uuid } });
  }
}
