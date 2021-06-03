const request = require("supertest");
const app = require("../../app");

test("players are returned as json", (done) => {
  request(app)
    .get("/api/players")
    .set("Accept", "application/json")
    .expect("Content-Type", /application\/json/)
    .expect(200, done);
});

test("a valid player can be added", (done) => {
  const newPlayer = {
    name: "Cersei Lannister",
    age: 43,
    health: 96,
    bag: [2],
  };

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
