import express from "express";
import upload from "../api/middleware/upload.js";
import { getAllOrchids, getOrchidById, createOrchid, updateOrchid, deleteOrchid } from "../api/controllers/orchidController.js";

// Cria o roteador
const router = express.Router();

// Rotas para orquídeas
router.get("/", getAllOrchids);
router.get("/:id", getOrchidById);
router.post("/", upload.single("image"), createOrchid);
router.put("/:id", upload.single("image"), updateOrchid);
router.delete("/:id", deleteOrchid);

export default router;
