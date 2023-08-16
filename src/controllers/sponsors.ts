import { Response, Request } from "express";
import SponsorRepository from "../repository/sponsors";

export default class SponsorController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await SponsorRepository.getAll(req.query);
      res.status(200).json({ status: true, message: "All sponsors", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const data = await SponsorRepository.show(req.params.uuid);
      res
        .status(200)
        .json({ status: true, message: "Success, sponsor found", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, imgUrl }: { title: string; imgUrl: string } = req.body;
      const data = await SponsorRepository.create({ title, imgUrl });
      res
        .status(200)
        .json({ status: true, message: "Success, sponsor created", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const item = await SponsorRepository.show(req.params.uuid);
      if (!item) throw new Error("Sponsor not found");

      const data = await SponsorRepository.update({
        uuid: req.params.uuid,
        payload: req.body,
      });
      res
        .status(200)
        .json({ status: true, message: "Success, sponsor updated", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const data = await SponsorRepository.delete(req.params.uuid);
      if (!data) throw new Error("Sponsor not found");
      res
        .status(200)
        .json({ status: true, message: "Success, sponsor deleted" });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }
}
