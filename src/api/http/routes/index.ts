import express from "express";

import logIngestRouter from "./logIngestRouter.js";
import logSearchRouter from "./logSearchRouter.js";

const router = express.Router();

router.use("/log", logIngestRouter);
router.use("/search", logSearchRouter);

export default router;
