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

describe("GET api/players/:id", () => {
  test("player with id 2 is returned", (done) => {
    request(app).get("/api/players/2").expect(hasSameId).expect(200, done);

    function hasSameId(res) {
      expect(res.body[0]).toHaveProperty("id", 2);
    }
  });
});

describe("PATCH api/players/:id", () => {
  test("player with id 2 is killed", (done) => {
    request(app)
      .patch("/api/players/2")
      .send({ health: null })
      .expect(hasHealthNull)
      .expect(200, done);

    function hasHealthNull(res) {
      expect(res.body[0]).toHaveProperty("health", null);
    }
  });
});
