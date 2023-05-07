import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

/**
 * UnitTrust Module Entry
 */

import ModuleServer from "./server/server";
const moduleServer = new ModuleServer();
      moduleServer.startUp();
process.on("uncaughtException", (err) => {
 moduleServer.shutdown(err);
});

process.on("unhandledRejection", (reason, p) => {
 console.log("Unhandled Rejection at:", p, "reason:", reason);
 moduleServer.shutdown(new Error("unhandledRejection"));
});

process.on("SIGTERM", () => {
 console.info('SIGTERM signal received.');
 moduleServer.shutdown(new Error("SIGERM"));
});

process.on("SIGINT", function () {
 console.info('SIGINT signal received.');
 moduleServer.shutdown(new Error("SIGINT"));
}); 
