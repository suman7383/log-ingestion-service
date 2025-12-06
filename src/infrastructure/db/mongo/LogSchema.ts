import { LogEntryOpt } from "#domain/log/LogEntry.js";
import mongoose from "mongoose";

export const LogSchema = new mongoose.Schema<LogEntryOpt>({
  service: {
    type: String,
    required: true,
    index: true,
  },
  level: {
    type: Number,
    required: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    index: true,
  },
  receivedAt: {
    type: Date,
    default: () => new Date(),
  },
  requestId: String,
  metadata: mongoose.SchemaTypes.Mixed,
});

export const LogModel = mongoose.model("Log", LogSchema);
