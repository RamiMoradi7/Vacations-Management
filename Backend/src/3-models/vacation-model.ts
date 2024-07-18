import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class VacationModel {
  public id: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.image = vacation.image;
  }
  private static insertValidateSchema = Joi.object({
    id: Joi.number().forbidden(),
    destination: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(100).max(10000).positive(),
    image: Joi.object().required(),
  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number().required(),
    destination: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(100).max(10000).positive(),
    image: Joi.object().optional(),
  });
  public validateInsert(): void {
    const result = VacationModel.insertValidateSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
  public validateUpdate(): void {
    const result = VacationModel.updateValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}
