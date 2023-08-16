import { Router } from "express";
import SponsorController from "../controllers/sponsors";
const router = Router();

router.get("/", SponsorController.getAll);
router.get("/:uuid", SponsorController.show);
router.post("/", SponsorController.create);
router.patch("/:uuid", SponsorController.update);
router.delete("/:uuid", SponsorController.delete);

export { router };
