import mongoose from "mongoose";

export class MongoConnection {
  private static instance: MongoConnection | null = null;
  private isConnected = false;

  // Intentionally empty to prevent direct construction
  private constructor() {}

  public static getInstance(): MongoConnection {
    return (MongoConnection.instance ??= new MongoConnection());
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      await mongoose.connect(uri);

      this.isConnected = true;
      // TODO-> replace with logger
      console.log("[MongoDB] Connected successfully");
    } catch (err) {
      console.error("[MongoDB] Connection error:", err);
      throw err;
    }
  }

  public disconnect(): Promise<void> {
    this.isConnected = false;
    return mongoose.disconnect();
  }
}
