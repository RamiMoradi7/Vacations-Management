import mysql2, { PoolOptions, QueryError } from "mysql2";
import { appConfig } from "./app-config";
class DAL {
  private options: PoolOptions = {
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
  };
  private readonly connection = mysql2.createPool(this.options);
  public execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(sql, values, (err: QueryError, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

export const dal = new DAL();
