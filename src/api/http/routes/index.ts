import express from "express";

import logIngestRouter from "./logIngestRouter.js";

const router = express.Router();

router.use("/log", logIngestRouter);

export default router;
