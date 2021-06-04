const { newPlayer } = require("../sources/source");

function hasSameId(res) {
  expect(res.body[0]).toHaveProperty("id", 2);
}

function hasHealthNull(res) {
  expect(res.body[0]).toHaveProperty("health", null);
}

function hasNewPlayer(res) {
  const data = res.body.map((player) => player.name);
  expect(data).toContainEqual(newPlayer.name);
}

function hasAddedObject(res) {
  expect(res.body[0].bag).toEqual(expect.arrayContaining([3]));
}

module.exports = {
  hasSameId,
  hasHealthNull,
  hasNewPlayer,
  hasAddedObject,
};
