class BaseAppConfig {
  public registerUrl?: string;
  public loginUrl?: string;
  public vacationsUrl?: string;
  public oneVacationUrl?: string;
  public vacationLikeUrl?: string;

  public readonly axiosOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
}

class DevelopmentAppConfig extends BaseAppConfig {
  public registerUrl = "http://localhost:4000/api/register/";
  public loginUrl = "http://localhost:4000/api/login/";
  public vacationsUrl = "http://localhost:4000/api/vacations/";
  public oneVacationUrl = "http://localhost:4000/api/vacation/";
  public vacationLikeUrl = "http://localhost:4000/api/vacations/like/";
}

class ProductionAppConfig extends BaseAppConfig {
  public registerUrl = "http://11.22.33.44:81/api/register/";
  public loginUrl = "http://11.22.33.44:81/api/login/";
  public vacationsUrl = "http://11.22.33.44:81/api/vacations/";
  public oneVacationUrl = "http://11.22.33.44:81/api/vacation/";
  public vacationLikeUrl = "http://11.22.33.44:81/api/vacations/like/";
}

export const appConfig =
  process.env.ENVIRONMENT === "production"
    ? new ProductionAppConfig()
    : new DevelopmentAppConfig();
