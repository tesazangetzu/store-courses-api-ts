import { Response, Request } from "express";
import CategoryRepository from "../repository/categories";

export default class CategoryController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await CategoryRepository.getAll(req.query);
      res.status(200).json({ status: true, message: "All categories", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const data = await CategoryRepository.show(req.params.uuid);
      res
        .status(200)
        .json({ status: true, message: "Success, category found", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, categoryUuid } = req.body;

      let categoryId = null;
      if (categoryUuid) {
        const item = await CategoryRepository.showWithAll(categoryUuid);
        if (!item) throw new Error("Category not found");
        categoryId = item.id;
      }

      const data = await CategoryRepository.create({ name, categoryId });
      res
        .status(200)
        .json({ status: true, message: "Success, category created", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { categoryUuid } = req.body;
      if (categoryUuid) {
        const item = await CategoryRepository.showWithAll(categoryUuid);
        if (!item) throw new Error("Category not found");
        req.body.categoryId = item.id;
        delete req.body.categoryUuid;
      }

      const data = await CategoryRepository.update({
        uuid: req.params.uuid,
        payload: req.body,
      });
      res
        .status(200)
        .json({ status: true, message: "Success, category updated", data });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const data = await CategoryRepository.delete(req.params.uuid);
      if (!data) throw new Error("Category not found");
      res
        .status(200)
        .json({ status: true, message: "Success, category deleted" });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  }
}
