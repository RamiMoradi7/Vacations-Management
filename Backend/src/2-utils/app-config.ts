import dotenv from "dotenv";
dotenv.config();

class AppConfig {
  public readonly isDevelopment = process.env.ENVIRONMENT === "development";
  public readonly isProduction = process.env.ENVIRONMENT === "production";
  public readonly port = process.env.PORT;

  // MySQL configuration
  public readonly mysqlHost = process.env.MYSQL_HOST;
  public readonly mysqlUser = process.env.MYSQL_USER;
  public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
  public readonly mysqlDatabase = process.env.MYSQL_DATABASE;

  // JWT and other configurations
  public readonly jwtSecretKey = process.env.JWT_SECRET_KEY;
  public readonly passwordSalt = process.env.PASSWORD_SALT;
  public readonly baseImageUrl = process.env.BASE_IMAGE_URL;
}

export const appConfig = new AppConfig();
