import { Response, Request } from "express";
import { HandlerError, HandlerSuccess } from "../helpers/handler";
import SkillRepository from "../repository/skills";

export default class SkillController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SkillRepository.getAll(req.query);
      return HandlerSuccess(res, "All skills", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SkillRepository.show(req.params.uuid);
      return HandlerSuccess(res, "Success, skill found", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, skillUuid } = req.body;

      let skillId = null;
      if (skillUuid) {
        const item = await SkillRepository.showWithAll(skillUuid);
        if (!item) throw new Error("Skill not found");
        skillId = item.id;
      }

      const data = await SkillRepository.create({ name, skillId });
      return HandlerSuccess(res, "Success, skill created", data);
    } catch (error: any) {
      console.log(error);
      return HandlerError(res, error, error.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
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
      return HandlerSuccess(res, "Success, skill updated", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SkillRepository.delete(req.params.uuid);
      if (!data) throw new Error("Skill not found");
      return HandlerSuccess(res, "Success, skill deleted", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }
}
