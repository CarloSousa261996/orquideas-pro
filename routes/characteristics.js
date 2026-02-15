import { Router } from "express";
import { getAllCharacteristics, getCharacteristicsByType } from "../api/controllers/characteristicController.js";

const router = Router();

// GET /api/characteristics - Retorna todas as características
router.get("/", getAllCharacteristics);

// GET /api/characteristics/:type - Retorna características de um tipo específico
router.get("/:type", getCharacteristicsByType);

export default router;
