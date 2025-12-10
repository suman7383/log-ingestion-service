import { logIngestController } from "#bootstrap/container.js";
import express from "express";

const router = express.Router();

router.post("/", logIngestController.ingest);

export default router;
