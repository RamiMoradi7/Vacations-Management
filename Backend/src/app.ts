import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { securityMiddleware } from "./4-middleware/security-middleware";
import { authRouter } from "./6-controllers/auth-controller";
import { likesRouter } from "./6-controllers/likes-controller";
import { vacationsRouter } from "./6-controllers/vacations-controller";

class App {
  public server = express();
  public start(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(expressFileUpload());
    this.server.use(
      expressRateLimit({
        windowMs: 1000,
        limit: 25,
        skip: securityMiddleware.skipRateLimit,
      })
    );

    fileSaver.config(path.join(__dirname, "1-assets", "images"));

    this.server.use("/api", vacationsRouter, likesRouter, authRouter);
    this.server.use(errorsMiddleware.routeNotFound);
    this.server.use(errorsMiddleware.catchAll);

    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port)
    );
  }
}
// Exporting for integration testing.
export const app = new App();
app.start();
