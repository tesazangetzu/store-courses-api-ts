import { Router } from "express";
import multer from "multer";
import ImageController from "../controllers/image";
const upload = multer();
const router = Router();

router.post("/", upload.single("file"), ImageController.upload);

export { router };
