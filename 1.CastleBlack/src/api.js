const { Router } = require("express");
const api = Router();
const _ = require("underscore");

const { players, objects } = require("./sources/source");
const { playerById, objectById } = require("./utils/api.utils.js");

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
      res.status(201).json(newPlayer);
    } else {
      res.status(406).json({ error: "Player with such name already exists" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
});

api.get("/players/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json(playerById(id));
});

api.patch("/players/:id", (req, res) => {
  const { id } = req.params;
  const { health } = req.body;
  if (health != 0) {
    playerById(id)[0].health = health;
    res.status(200).json(playerById(id));
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.patch("/players/:id/:objectId", (req, res) => {
  const { id, objectId } = req.params;
  if (id && objectId) {
    if (
      playerById(id).length > 0 &&
      objectById(parseInt(objectId)).length > 0
    ) {
      const indexObject = _.indexOf(playerById(id)[0].bag, parseInt(objectId));
      if (indexObject == -1) {
        playerById(id)[0].bag.push(parseInt(objectId));
        res.json(playerById(id));
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
  res.status(200).json(objects);
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
      res.status(201).json(newObject);
    } else {
      res.status(406).json({ error: "Object with such name already exists" });
    }
  } else {
    res.status(500).json({ error: "Error occures" });
  }
});

api.get("/objects/:id", (req, res) => {
  const { id } = req.params;
  const indexObjectToGet = _.indexOf(objects, objectById(id)[0]);
  if (indexObjectToGet != -1) {
    res.status(200).json(objectById(id));
  } else {
    res.status(204).json({ error: "No content" });
  }
});

api.put("/objects/:id", (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  const objectToUpdate = objectById(id);
  const indexObjectToUpdate = _.indexOf(objects, objectToUpdate[0]);
  const indexObjectToUpdateName = _.indexOf(
    objects.map((object) => object.name),
    name
  );
  if (
    name &&
    value &&
    indexObjectToUpdateName == -1 &&
    indexObjectToUpdate != -1
  ) {
    objectToUpdate[0].name = name;
    objectToUpdate[0].value = value;
    res.status(200).json(objectToUpdate);
  } else {
    res.status(400).json({ error: "Bad request" });
  }
});

api.patch("/objects/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const objectToUpdateValue = objectById(id);
  const indexObjectToUpdateValue = _.indexOf(objects, objectToUpdateValue[0]);
  if (indexObjectToUpdateValue != -1 && value) {
    objectToUpdateValue[0].value = value;
    res.status(200).json(objectToUpdateValue);
  } else {
    res.status(400).json({ error: "Bad request" });
  }
});

api.delete("/objects/:id", (req, res) => {
  const { id } = req.params;
  objectToDelete = objectById(id);
  const indexObjectToDelete = _.indexOf(objects, objectToDelete[0]);
  if (indexObjectToDelete != -1) {
    objects.splice(indexObjectToDelete, 1);
    res.status(200).json({ success: "Object has been deleted." });
  } else {
    res.status(406).json({ error: "Such object does not exist" });
  }
});

module.exports = api;
