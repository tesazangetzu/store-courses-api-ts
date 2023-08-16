import { Request, Response } from "express";
import { imgUpload } from "../services/aws";

export default class ImageController {
  static async upload(req: Request, res: Response) {
    try {
      if (!req.file) throw new Error("Image required");
      const { url } = await imgUpload(req.file);
      res
        .status(200)
        .json({ status: true, message: "Succes, Upload image", url });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }
}
