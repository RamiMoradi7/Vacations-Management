import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import { StatusCode } from "../src/3-models/enums";
import { app } from "../src/app";
import { cyber } from "../src/2-utils/cyber";

describe("Testing Authorization Controller", () => {
  const user = {
    firstName: "Rami",
    lastName: "Moradi",
    email: "R@gmail.com",
    password: "12345",
  };
  it("Should successfully register a new user if email not exists and return a valid token", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .send(user);
    const token = response.body;
    const isValidToken = cyber.isTokenValid(response.body);
    expect(response.status).to.equal(StatusCode.Created);
    expect(token).to.be.a("string").and.not.empty;
    expect(isValidToken).to.be.true;
  });
  it("Should successfully login an existing user and return a valid token", async () => {
    const credentials = {
      email: "R@gmail.com",
      password: "12345",
    };
    const response = await supertest(app.server)
      .post("/api/login")
      .send(credentials);
    const token = response.body;
    const isValidToken = cyber.isTokenValid(response.body);
    expect(response.status).to.equal(StatusCode.OK);
    expect(token).to.be.a("string").and.not.empty;
    expect(isValidToken).to.be.true;
  });
  it("Should fail login if email or password incorrect", async () => {
    const user = {
      email: "R@gmail.com",
      password: "00000",
    };
    const response = await supertest(app.server).post("/api/login").send(user);
    expect(response.status).to.equal(StatusCode.Unauthorized);
    expect(response.body).to.not.have.property("token");
  });
  it("Should fail register new user if email already exists", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .send(user);
    expect(response.status).to.equal(StatusCode.BadRequest);
  });
});
