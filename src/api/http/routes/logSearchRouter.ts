import { logSearchController } from "#bootstrap/container.js";
import express from "express";

const router = express.Router();

router.get("/", logSearchController.search);

export default router;
