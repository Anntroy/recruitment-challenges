const { Router } = require("express");
const api = Router();
const _ = require("underscore");

const { players, objects } = require("./helpers/source");

// ENDPOINTS FOR PLAYERS
api.get("/players", (req, res) => {
  res.status(200).json(players);
});

api.post("/players", (req, res) => {
  const { name, age, health, bag } = req.body;
  if (name && age && health && bag) {
    const id = players.length + 1;
    const newPlayer = { ...req.body, id };
    const indexOfNewPlayerName = _.indexOf(
      players.map((player) => player.name),
      newPlayer.name
    );
    if (indexOfNewPlayerName == -1) {
      players.push(newPlayer);
      res.status(201).json(players);
    } else {
      res.status(406).json({ error: "Player with such name already exists" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
});

api.get("/players/:id", (req, res) => {
  const { id } = req.params;
  const playerById = _.filter(players, (player) => {
    return player.id == id;
  });
  res.status(200).json(playerById);
});

api.patch("/players/:id", (req, res) => {
  const { id } = req.params;
  const { health } = req.body;
  if (health != 0) {
    const playerById = _.filter(players, (player) => {
      return player.id == id;
    });
    playerById[0].health = health;
    res.status(200).json(playerById);
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.patch("/players/:id/:objectId", (req, res) => {
  const { id, objectId } = req.params;
  if (id && objectId) {
    const playerById = _.filter(players, (player) => {
      return player.id == id;
    });
    const objectById = _.filter(objects, (object) => {
      return object.id == parseInt(objectId);
    });
    if (playerById.length > 0 && objectById.length > 0) {
      const indexObject = _.indexOf(playerById[0].bag, parseInt(objectId));
      if (indexObject == -1) {
        playerById[0].bag.push(parseInt(objectId));
        res.json(playerById);
      } else {
        res.status(406).json({ error: "Object is already in the bag" });
      }
    } else {
      res.status(400).json({ error: "Bad request" });
    }
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

// ENDPOINTS FOR OBJECTS
api.get("/objects", (req, res) => {
  res.json(objects);
});

api.post("/objects", (req, res) => {
  const { name, value } = req.body;
  if (name && value) {
    const id = objects.length + 1;
    const newObject = { ...req.body, id };
    const indexOfNewObjectName = _.indexOf(
      objects.map((object) => object.name),
      newObject.name
    );
    if (indexOfNewObjectName == -1) {
      objects.push(newObject);
      res.status(201).json(objects);
    } else {
      res.status(406).json({ error: "Object with such name already exists" });
    }
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.get("/objects/:id", (req, res) => {
  const { id } = req.params;
  const objectById = _.filter(objects, (object) => {
    return object.id == id;
  });
  res.status(200).json(objectById);
});

api.put("/objects/:id", (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  if (name && value) {
    _.each(objects, (object) => {
      if (object.id == id) {
        object.name = name;
        object.value = value;
      }
    });
    res.json(objects);
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.patch("/objects/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (value) {
    _.each(objects, (object) => {
      if (object.id == id) {
        object.value = value;
      }
    });
    res.json(objects);
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.delete("/objects/:id", (req, res) => {
  const { id } = req.params;
  _.filter(objects, (object) => {
    return object.id != id;
  });
  res.status(200).json({ success: "Object has been deleted." });
});

module.exports = api;
