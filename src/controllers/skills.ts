import { Response, Request } from "express";
import SkillRepository from "../repository/skills";

export default class SkillController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await SkillRepository.getAll(req.query);
      res.status(200).json({ status: true, message: "All skills", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const data = await SkillRepository.show(req.params.uuid);
      res
        .status(200)
        .json({ status: true, message: "Success, skill found", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, skillUuid } = req.body;

      let skillId = null;
      if (skillUuid) {
        const item = await SkillRepository.showWithAll(skillUuid);
        if (!item) throw new Error("Skill not found");
        skillId = item.id;
      }

      const data = await SkillRepository.create({ name, skillId });
      res
        .status(200)
        .json({ status: true, message: "Success, skill created", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { skillUuid } = req.body;
      if (skillUuid) {
        const item = await SkillRepository.showWithAll(skillUuid);
        if (!item) throw new Error("Skill not found");
        req.body.skillId = item.id;
        delete req.body.skillUuid;
      }

      const data = await SkillRepository.update({
        uuid: req.params.uuid,
        payload: req.body,
      });
      res
        .status(200)
        .json({ status: true, message: "Success, skill updated", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const data = await SkillRepository.delete(req.params.uuid);
      if (!data) throw new Error("Skill not found");
      res.status(200).json({ status: true, message: "Success, skill deleted" });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }
}
