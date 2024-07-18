import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../5-services/vacations-service";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";

class VacationController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get(
      "/vacations/:userId",
      securityMiddleware.verifyLoggedIn,
      this.getVacations
    );
    this.router.get(
      "/vacation/:id",
      securityMiddleware.verifyLoggedIn,
      this.getOneVacation
    );
    this.router.post(
      "/vacations",
      securityMiddleware.verifyAdmin,
      this.addVacation
    );
    this.router.put(
      "/vacations/:id",
      securityMiddleware.verifyAdmin,
      this.updateVacation
    );
    this.router.delete(
      "/vacations/:id",
      securityMiddleware.verifyAdmin,
      this.deleteVacation
    );

    this.router.get("/vacations/images/:imageName", this.getImageFile);
  }

  private async getVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacations = await vacationService.getVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
  private async getOneVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const vacation = await vacationService.getOneVacation(id);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }

  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.addVacation(vacation);
      response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      request.body.id = +request.params.id;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationService.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await vacationService.deleteVacation(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
  private async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageName = request.params.imageName;
      const imagePath = await fileSaver.getFilePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
}

const vacationsController = new VacationController();
export const vacationsRouter = vacationsController.router;
