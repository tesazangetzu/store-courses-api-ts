import { Router } from "express";
import SkillController from "../controllers/skills";
const router = Router();

router.get("/", SkillController.getAll);
router.get("/:uuid", SkillController.show);
router.post("/", SkillController.create);
router.patch("/:uuid", SkillController.update);
router.delete("/:uuid", SkillController.delete);

export { router };
