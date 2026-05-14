const request = require("supertest");
const app = require("./server");

describe("Task Manager API", () => {

  let createdTaskId;

  test("Create Task - Normal Case", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", description: "Test Desc" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");

    createdTaskId = res.body.id;
  });

  test("Create Task - Invalid Case (No Title)", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ description: "No Title" });

    expect(res.statusCode).toBe(400);
  });

  test("Get All Tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Get Task By ID - Edge Case (Invalid ID)", async () => {
    const res = await request(app).get("/tasks/999");
    expect(res.statusCode).toBe(404);
  });

  test("Update Task", async () => {
    const res = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send({ title: "Updated Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  test("Delete Task", async () => {
    const res = await request(app)
      .delete(`/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
  });

});