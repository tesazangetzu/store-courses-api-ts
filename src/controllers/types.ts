import { Response, Request } from "express";
import { HandlerError, HandlerSuccess } from "../helpers/handler";
import TypeRepository from "../repository/types";

export default class TypeController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const data = await TypeRepository.getAll(req.query);
      return HandlerSuccess(res, "All types", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const data = await TypeRepository.show(req.params.uuid);
      if (!data) throw new Error("Type not found");
      return HandlerSuccess(res, "Success, type found", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, model } = req.body;
      const data = await TypeRepository.create({ name, model });
      return HandlerSuccess(res, "Success, type created", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = await TypeRepository.update({
        uuid: req.params.uuid,
        payload: req.body,
      });
      return HandlerSuccess(res, "Success, type updated", data);
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const data = await TypeRepository.delete(req.params.uuid);
      if (!data) throw new Error("Type not found");
      return HandlerSuccess(res, "Success, type deleted");
    } catch (error: any) {
      return HandlerError(res, error, error.message);
    }
  }
}
