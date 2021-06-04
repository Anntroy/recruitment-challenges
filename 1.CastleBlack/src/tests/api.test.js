const request = require("supertest");
const app = require("../../app");
const { newPlayer, uncompleteNewPlayer } = require("../helpers/source");

describe("GET api/players", () => {
  test("players are returned as json", (done) => {
    request(app)
      .get("/api/players")
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(200, done);
  });
});

describe("POST api/players", () => {
  test("a valid player can be added", (done) => {
    request(app)
      .post("/api/players")
      .send(newPlayer)
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(201, done);

    request(app).get("/api/players").expect(hasNewPlayer).end(done);

    function hasNewPlayer(res) {
      const data = res.body.map((player) => player.name);
      expect(data).toContainEqual(newPlayer.name);
    }
  });
  test("new player without name can not be added", (done) => {
    request(app)
      .post("/api/players")
      .send(uncompleteNewPlayer)
      .expect(400, done);
  });
});
