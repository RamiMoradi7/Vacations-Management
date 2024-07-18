import express, { NextFunction, Request, Response } from "express";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { likesService } from "../5-services/likes-service";
import { StatusCode } from "../3-models/enums";

class LikesController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post(
      "/vacations/like/:userId/:vacationId",
      securityMiddleware.verifyLoggedIn,
      this.likeVacation
    );

    this.router.delete(
      "/vacations/like/:userId/:vacationId",
      securityMiddleware.verifyLoggedIn,
      this.unLikeVacation
    );
  }
  private async likeVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await likesService.likeVacation({ userId, vacationId });
      response.sendStatus(StatusCode.OK);
    } catch (err: any) {
      next(err);
    }
  }
  private async unLikeVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await likesService.unlikeVacation({ userId, vacationId });
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

export const likesController = new LikesController();
export const likesRouter = likesController.router;
