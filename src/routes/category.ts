import { Router } from "express";
import CategoryController from "../controllers/categories";
const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:uuid", CategoryController.show);
router.post("/", CategoryController.create);
router.patch("/:uuid", CategoryController.update);
router.delete("/:uuid", CategoryController.delete);

export { router };
