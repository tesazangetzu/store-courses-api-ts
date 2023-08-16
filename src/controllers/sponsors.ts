import { Response, Request } from "express";
import { HandlerError, HandlerSuccess } from "../helpers/handler";
import SponsorRepository from "../repository/sponsors";

export default class SponsorController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SponsorRepository.getAll(req.query);
      return HandlerSuccess(res, "All sponsors", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SponsorRepository.show(req.params.uuid);
      if (!data) throw new Error("Sponsor not found");
      return HandlerSuccess(res, "Success, sponsor found", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, imgUrl }: { title: string; imgUrl: string } = req.body;
      const data = await SponsorRepository.create({ title, imgUrl });
      return HandlerSuccess(res, "Success, sponsor created", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const item = await SponsorRepository.show(req.params.uuid);
      if (!item) throw new Error("Sponsor not found");

      const data = await SponsorRepository.update({
        uuid: req.params.uuid,
        payload: req.body,
      });
      return HandlerSuccess(res, "Success, sponsor updated", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const data = await SponsorRepository.delete(req.params.uuid);
      if (!data) throw new Error("Sponsor not found");
      return HandlerSuccess(res, "Success, sponsor deleted");
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }
}
