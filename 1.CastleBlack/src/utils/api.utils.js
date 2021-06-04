const _ = require("underscore");

const { players, objects } = require("../sources/source");

const playerById = (id) =>
  _.filter(players, (player) => {
    return player.id == id;
  });

const objectById = (id) =>
  _.filter(objects, (object) => {
    return object.id == id;
  });

module.exports = {
  playerById,
  objectById,
};
