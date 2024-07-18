import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/enums";

describe("Testing Likes Controller", () => {
  let token: string;
  before(async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "Rami@gmail.com", password: "123456" });
    token = response.body;
  });
  it("should fail to like vacation if it's already liked", async () => {
    const response = await supertest(app.server)
      .post("/api/vacations/like/5/37")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.equal(StatusCode.BadRequest);
  });
  it("should like vacation if logged in and not liked already", async () => {
    const response = await supertest(app.server)
      .post("/api/vacations/like/5/81")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.equal(StatusCode.OK);
  });
  it("should unlike vacation when logged in", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacations/like/5/78")
      .set("Authorization", "Bearer " + token);

    expect(response.status).to.equal(StatusCode.NoContent);
  });
  it("Should fail unlike non existing vacation or userId", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacations/like/158/157")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.equal(StatusCode.NotFound);
  });
  it("Should fail like vacation if not logged in", async () => {
    const response = await supertest(app.server).post(
      "/api/vacations/like/5/37"
    );
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
  it("Should fail unlike vacation if not logged in", async () => {
    const response = await supertest(app.server).delete(
      "/api/vacations/like/5/41"
    );
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
});
