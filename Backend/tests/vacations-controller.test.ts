import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { VacationModel } from "../src/3-models/vacation-model";
import fs from "fs";
import { StatusCode } from "../src/3-models/enums";

describe("Testing Vacations Controller", () => {
  let token: string;
  const imageBuffer = fs.readFileSync(__dirname + "/resources/space.jpg");
  before(async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "Assaf@gmail.com", password: "4565" });
    token = response.body;
  });

  it("Should return vacations array when logged in", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations/7")
      .set("Authorization", "Bearer " + token);
    const vacations: VacationModel[] = response.body;
    expect(vacations.length).to.be.greaterThanOrEqual(0);
    expect(vacations).to.not.be.empty;
    const firstVacation = vacations[0];
    expect(firstVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl",
      "isLiked",
      "likesCount"
    );
  });

  it("Should return a single vacation when logged in", async () => {
    const response = await supertest(app.server)
      .get("/api/vacation/37")
      .set("Authorization", "Bearer " + token);
    const vacation: VacationModel = response.body;
    expect(Array.isArray(vacation)).to.be.false;
    expect(vacation).to.not.be.empty;
    expect(vacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should add a new vacation when logged in", async () => {
    const response = await supertest(app.server)
      .post("/api/vacations")
      .field("destination", "Space")
      .field("description", "Journey to Space")
      .field("startDate", "2024-02-01")
      .field("endDate", "2024-03-01")
      .field("price", "8989")
      .attach("image", imageBuffer, "space.jpg")
      .set("Authorization", "Bearer " + token);

    const addedVacation: VacationModel = response.body;
    expect(addedVacation).to.not.be.empty;
    expect(Array.isArray(addedVacation)).to.be.false;
    expect(response.status).to.equal(StatusCode.Created);
    expect(addedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should fail adding new vacation if missing properties", async () => {
    const response = await supertest(app.server)
      .post("/api/vacations")
      .field("destination", "Costa Rica")
      .field("description", "Journey to Space")
      .field("startDate", "2024-02-01")
      .field("endDate", "2024-03-01")
      .set("Authorization", "Bearer " + token);
    expect(response.body).to.be.empty;
    expect(response.status).to.equal(StatusCode.BadRequest);
  });
  it("Should update existing vacation when logged in", async () => {
    const response = await supertest(app.server)
      .put("/api/vacations/112")
      .field("destination", "Welcome to Space!")
      .field("description", "Don't miss our trip to Space!")
      .field("startDate", "2024-05-02")
      .field("endDate", "2024-06-07")
      .field("price", "2346")
      .attach("image", imageBuffer, "space.jpg")
      .set("Authorization", "Bearer " + token);
    const updatedVacation: VacationModel = response.body;
    expect(updatedVacation).to.not.be.empty;
    expect(Array.isArray(updatedVacation)).to.be.false;
    expect(updatedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should fail deleting un existing vacation", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacations/999")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.equal(StatusCode.NotFound);
  });
  it("Should delete existing vacation when logged in", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacations/112")
      .set("Authorization", "Bearer " + token);

    expect(response.status).to.equal(StatusCode.NoContent);
  });
  it("Should fail to get vacations if not logged in", async () => {
    const response = await supertest(app.server).get("/api/vacations/7");
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
  it("Should fail to add vacation if not logged in", async () => {
    const vacation = {};
    const response = await supertest(app.server)
      .post("/api/vacations")
      .send(vacation);
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
  it("Should fail to update vacation if not logged in", async () => {
    const vacation = {};
    const response = await supertest(app.server)
      .put("/api/vacations/41")
      .send(vacation);
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
  it("Should fail to delete vacation if not logged in", async () => {
    const response = await supertest(app.server).delete("/api/vacations/41");
    expect(response.status).to.equal(StatusCode.Unauthorized);
  });
});
