// index.test.js

import request from "supertest"; //server testing
import app from "./server";
import mongoose from "mongoose";

beforeAll(async () => {
  mongoose
    .connect(
      "mongodb+srv://mugwaneza:jltB26e3F0ueZGOZ@cluster0.v7gsbr4.mongodb.net/portifolio?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("the database connection was successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoose.connection.close();
});

describe("server testing", () => {
  it("return a sucess", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

describe("get all blogs", () => {
  it("return a sucess", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.status).toBe(200);
  });
});

describe("get blog by id", () => {
  const blogId = "65fc8deb3f8eaa3ad46fbe9f";

  it("return a sucess", async () => {
    const res = await request(app).get(`/api/blogs/${blogId}`);
    expect(res.status).toBe(200);
  });
});

describe("create a new a blog", () => {
  const newBlog = {
    blogName: "blogtesting",
    blogDescription: "this is for testing",
  };
  it("return a sucess", async () => {
    const res = await request(app).post(`/api/blogs`).send(newBlog);
    expect(res.status).toBe(201);
  });
});

describe("get blog by id", () => {
  const blogId = "65fc8deb3f8eaa3ad46fbe9f";

  it("returns an error", async () => {
    const res = await request(app).get(`/api/blogs/$:id`);
    expect(res.status).toBe(500);
  });
});

describe("update blog by id", () => {
  const blogId = "65f960ade1697c5c8e25f355";
  const newBlog = {
    blogName: "my  updated blog",
    blogDescription: "this is a testing update blog",
  };
  it("returns an error", async () => {
    const res = await request(app).patch(`/api/blogs/${blogId}`).send(newBlog);
    expect(res.status).toBe(200);
  });
});

describe("update blog by id", () => {
  const blogId = "65f960ade1697c5c8e25f355";
  const newBlog = {
    blogName: "my  updated blog",
    blogDescription: "this is a testing update blog",
  };
  it("returns an error", async () => {
    const res = await request(app).patch(`/api/blogs/blogId`).send(newBlog);
    expect(res.status).toBe(500);
  });
});

describe("update blog by id", () => {
  const blogId = "65f960ade1697c5c8e25f355";
  const newBlog = {
    blogName: "my  updated blog",
    blogDescription: "this is a testing update blog",
  };
  it("returns an error", async () => {
    const res = await request(app).post(`/api/blogs/${blogId}`).send(newBlog);
    expect(res.status).toBe(404);
  });
});

describe(" should get all blogs ", () => {
  it("returns a 500 error", async () => {
    const res = await request(app).post("/api/blogs");
    expect(res.status).toBe(500);
  });
});

describe(" should get all blogs", () => {
  it("returns a 404 error", async () => {
    const res = await request(app).post("/api/blog");
    expect(res.status).toBe(404);
  });
});

describe(" shouldn't find the blog with the id", () => {
  it("returns a 404 error", async () => {
    const blogId = "65f960ade1697c5c8e25f355";
    const res = await request(app).get(`/api/blog/${blogId}`);
    expect(res.status).toBe(404);
  });
});

describe(" should create a new message", () => {
  it("returns a suceess", async () => {
    const newMessage = {
      name: "mugwaneza",
      email: "mugz@gmail.com",
      message: "good morning",
    };
    const res = await request(app).post("/messages/add-message");
    expect(res.status).toBe(201);
  });
});

describe(" shouldn't find the message with the id to delete", () => {
  it("returns a 404 error", async () => {
    const messageId = "65f960ade1697c5c8e25f355";
    const res = await request(app).post(
      `/messages/delete-message/${messageId}`
    );
    expect(res.status).toBe(404);
  });
});

describe(" user api testing", () => {
  it("should  create and register a user  and return success ", async () => {
    const aUser = {
      username: "ineza",
      email: "ineza@gmail.com",
      password: "ineza",
    };
    const res = await request(app).post(`/api/users/signup`).send(aUser);

    expect(res.status).toEqual(201);
  });

  it("should  log in a registered  user  and return success ", async () => {
    const registeredUser = { email: "rugiran@gmail.com", password: "rugiran" };
    const res = await request(app)
      .post(`/api/users/login`)
      .send(registeredUser);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjk2Y2QxNjQxODc0ZjJlZGY0NmFmMyIsImlhdCI6MTcxMDg0NTE4NSwiZXhwIjoxNzEzNDM3MTg1fQ.x5mxuFrwi3nANX_HkieZvNVDbHLmHuP9k3VbAaOoCK";

    expect(res.status).toEqual(200);
  });
});
