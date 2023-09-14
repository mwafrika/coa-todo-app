import request from "supertest";
import app from "../../index";

describe("GET TODOs", () => {
  test("Should show a welcome message", async () => {
    const response = await request(app).get("/").send({
      message: "Message sent",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Message sent");
  });
});
