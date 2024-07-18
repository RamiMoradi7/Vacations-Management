import { kMaxLength } from "buffer";

export class VacationModel {
  public id: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: File;
  public imageUrl: string;
  public isLiked: number;
  public likesCount: number;

  public static destinationValidation = {
    required: "Destination is missing.",
    minLength: {
      value: 3,
      message: "Destination must be at least 3 characters.",
    },
    MaxLength: {
      value: 100,
      message: "Destination cannot exceed 100 characters.",
    },
  };
  public static descriptionValidation = {
    required: "Description is missing.",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters.",
    },
    MaxLength: {
      value: 1000,
      message: "Description cannot exceed 1000 characters.",
    },
  };
  public static startDateValidation = {
    required: "Vacation start date is missing.",
  };
  public static endDateValidation = {
    required: "Vacation end date is missing.",
  };
  public static priceValidation = {
    required: "Price is missing.",
    min: { value: 1, message: "Price cannot be negative." },
    max: { value: 10000, message: "Price cannot exceed 10000$" },
  };
}
