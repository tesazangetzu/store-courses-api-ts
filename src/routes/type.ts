import { Router } from "express";
import TypeController from "../controllers/types";
const router = Router();

router.get("/", TypeController.getAll);
router.get("/:uuid", TypeController.show);
router.post("/", TypeController.create);
router.patch("/:uuid", TypeController.update);
router.delete("/:uuid", TypeController.delete);

export { router };
