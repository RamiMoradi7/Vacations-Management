import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";

class Cyber {
  public getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options: SignOptions = { expiresIn: "5h" };
    const token = jwt.sign(container, appConfig.jwtSecretKey, options);
    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;
      jwt.verify(token, appConfig.jwtSecretKey);
      return true;
    } catch (err: any) {
      return false;
    }
  }
  public isAdmin(token: string): boolean {
    if (!token) return false;
    const container = jwt.decode(token) as { user: UserModel };
    const user = container.user;
    return user.roleId === RoleModel.Admin;
  }

  public hashPassword(plainText: string): string {
    const hashedPassword = crypto
      .createHmac("sha512", appConfig.passwordSalt)
      .update(plainText)
      .digest("hex");

    return hashedPassword;
  }
}

export const cyber = new Cyber();
