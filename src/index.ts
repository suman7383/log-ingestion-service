import { flushLogsService } from "#bootstrap/container.js";
import app from "#bootstrap/http-server.js";
import { MongoConnection } from "#infrastructure/db/mongo/MongoConnection.js";
import { config } from "../config/config.js";

async function startServer() {
  try {
    await MongoConnection.getInstance().connect(config.MONGODB_URI);

    app.listen(5000, () => {
      console.info("[SERVER] started listening on port: 5000");

      flushLogsService.startExecute();
    });
  } catch (err: unknown) {
    console.error("[MONGODB] failed to connect:", err);
  }
}

startServer();
