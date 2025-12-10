import { errorHandler } from "#api/http/middlewares/errorHandler.js";
import router from "#api/http/routes/index.js";
import express from "express";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Error handler
app.use(errorHandler);

export default app;
