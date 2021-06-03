const request = require("supertest");
const app = require("../../app");

test("players are returned as json", (done) => {
  request(app)
    .get("/api/players")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
