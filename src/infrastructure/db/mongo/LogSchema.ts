import { LogEntryOpt } from "#domain/log/LogEntry.js";
import mongoose from "mongoose";

export const LogSchema = new mongoose.Schema<LogEntryOpt>({
  level: {
    index: true,
    required: true,
    type: Number,
  },
  message: {
    required: true,
    type: String,
  },
  metadata: mongoose.SchemaTypes.Mixed,
  receivedAt: {
    default: () => new Date(),
    type: Date,
  },
  requestId: String,
  service: {
    index: true,
    required: true,
    type: String,
  },
  timestamp: {
    index: true,
    required: true,
    type: String,
  },
});

export const logModel = mongoose.model("Log", LogSchema);
