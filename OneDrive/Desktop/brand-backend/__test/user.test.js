import supertest from "supertest";
import app from "../server.js";
import userModel from "../src/models/userModel.js";

JsonWebTokenError.mock("../src/models/userModel.js");

describe("POST/users", () => {
  describe("given a username,email and password", () => {
    //should save the username and password to the database
    //should respond with a json object containing the user id

    Test("should respond with a 200 status code", async () => {
      const response = await request(app).post("users").send({
        username: "username",
        email: "email",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
    // should specify json in the content header
  });
  describe("when the username, email and password is missing", () => {
    // should respond with a status code of 400
  });
});
