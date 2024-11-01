const {
  test,
  expect,
  describe,
  it,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { encrypt } = require("../helpers/bcrypt");

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjkzMTIzMDZ9.wqsmIx8E3OnUL3efjDLKbpsUt3MaTBSvmiNHY05Ch6w";

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin1",
          email: "admin@gmail.com",
          password: encrypt("admin12"),
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user1",
          email: "user1@gmail.com",
          password: encrypt("123456"),
          role: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    let dataService = require("../seed-material.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Services", dataService, {});
  } catch (err) {
    // console.log(err, '<<<< err di beforeAll');
  }
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Services", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  test("should login the registered user", async () => {
    const data = {
      email: "admin@gmail.com",
      password: "admin12",
    };
    const response = await request(app).post("/login").send(data);
    console.log();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });
  test("should be error if user not input email", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "admin12",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password are required"
    );
  });
  test("should be error if user not input Password", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password are required"
    );
  });
  test("should be error if user wrong input email", async () => {
    const response = await request(app).post("/login").send({
      email: "admin12@gmail.com",
      password: "admin12",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid Email or Password"
    );
  });
  test("should be error if user wrong input password", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "admin12345",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid Email or Password"
    );
  });
});

describe("GET /service/list", () => {
  test("Successful GET /service/list", async () => {
    const response = await request(app).get("/");
    // console.log();
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(false);
    
  });
});


describe("POST /service/add", () => {
  test("Successful POST /service/add", async () => {
    const data = {
      name: "Lily",
      region: "mondo",
      price: 200,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcO1x1HuW8hylTJOdKQJalNhpxzhW9M4uPw&s",
      description: "sadsfdfsdfsdfdgfsdgdfgdfgdfgfd",
      type: "Grinding",
    };

    const response = await request(app)
      .post("/service/add")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);
    // console.log();

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("name", "Lily");
    expect(response.body).toHaveProperty(
      "region",
      "mondo"
    );
    expect(response.body).toHaveProperty("price", 200);
    expect(response.body).toHaveProperty(
      "imageUrl",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcO1x1HuW8hylTJOdKQJalNhpxzhW9M4uPw&s"
    );
    expect(response.body).toHaveProperty("description", sadsfdfsdfsdfdgfsdgdfgdfgdfgfd);
    expect(response.body).toHaveProperty("type", Grinding);
  });

  test("fail not login POST /service/add", async () => {
    const data = {
      name: "Lily",
      region: "mondo",
      price: 200,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcO1x1HuW8hylTJOdKQJalNhpxzhW9M4uPw&s",
      description: "sadsfdfsdfsdfdgfsdgdfgdfgdfgfd",
      type: "Grinding",
    };

    const response = await request(app)
      .post("/service/add")

      .send(data);
    // console.log();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalide Token");
  });

  test("token invalid /service/add", async () => {
    const data = {
      name: "Lily",
      region: "mondo",
      price: 200,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcO1x1HuW8hylTJOdKQJalNhpxzhW9M4uPw&s",
      description: "sadsfdfsdfsdfdgfsdgdfgdfgdfgfd",
      type: "Grinding",
    };

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${access_token}+ hehe`)
      .send(data);
    // console.log();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalide Token");
  });

  test("Request body not valid /service/add", async () => {
    const data = {
      name: "Lily",
      region: "mondo",
      price: 200,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcO1x1HuW8hylTJOdKQJalNhpxzhW9M4uPw&s",
      description: "sadsfdfsdfsdfdgfsdgdfgdfgdfgfd",
      type: "Grinding",
    };

    const response = await request(app)
      .post("/service/add")
      .set("Authorization", `Bearer ${access_token}`)
      .send(data);
    // console.log();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Title must fill");
  });
});

