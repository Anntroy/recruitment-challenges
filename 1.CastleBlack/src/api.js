const { Router } = require("express");
const api = Router();
const _ = require("underscore");

const { players, objects } = require("./sources/source");
const { playerById, objectById } = require("./utils/api.utils.js");

// ENDPOINTS FOR PLAYERS

// Endpoint to get all players
api.get("/players", (req, res) => {
  res.status(200).json(players);
});

// Endpoint to create a new player if there is no existing player with the same name
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

// Endpoint to get player by id
api.get("/players/:id", (req, res) => {
  const { id } = req.params;
  const indexPlayerToGet = _.indexOf(players, playerById(id)[0]);
  if (indexPlayerToGet != -1) {
    res.status(200).json(playerById(id));
  } else {
    res.status(204).json({ error: "No content" });
  }
});

// Endpoint to kill player (set player's health to null)
api.patch("/players/:id", (req, res) => {
  const { id } = req.params;
  const { health } = req.body;
  const indexPlayerToKill = _.indexOf(players, playerById(id)[0]);
  if (health != 0 && indexPlayerToKill != -1) {
    playerById(id)[0].health = health;
    res.status(200).json(playerById(id));
  } else {
    res.status(400).json({ error: "Bad request" });
  }
});

//  Endpoint to add a new object to the player's bag just in case this player exists and has no same object already
api.patch("/players/:id/:objectId", (req, res) => {
  const { id, objectId } = req.params;
  if (
    id &&
    objectId &&
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
});

// ENDPOINTS FOR OBJECTS

// Endpoint to get all objects
api.get("/objects", (req, res) => {
  res.status(200).json(objects);
});

// Endpoint to create a new object if there is no existing object with the same name
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

// Endpoint to get object by id
api.get("/objects/:id", (req, res) => {
  const { id } = req.params;
  const indexObjectToGet = _.indexOf(objects, objectById(id)[0]);
  if (indexObjectToGet != -1) {
    res.status(200).json(objectById(id));
  } else {
    res.status(204).json({ error: "No content" });
  }
});

// Endpoint to update object if the object exists and there is no other object with the same name
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

// Endpoint to update the object's value if the object exists
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

// Endpoint to delete the object if it exists
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
