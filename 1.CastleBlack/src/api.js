const { Router } = require("express");
const api = Router();
const _ = require("underscore");

// This will be your data source
const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] },
];
const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 },
];

// ENDPOINTS FOR PLAYERS
api.get("/players", (req, res) => {
  res.json(players);
});

api.post("/players", (req, res) => {
  const { name, age, health, bag } = req.body;
  if (name && age && health && bag) {
    const id = players.length + 1;
    const newPlayer = { ...req.body, id };
    players.push(newPlayer);
    res.status(201).json(players);
  } else {
    res.status(500).json({ error: "Error occures" });
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
    _.each(players, (player) => {
      if (player.id == id) {
        player.health = health;
      }
    });
    res.json(players);
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
    objects.push(newObject);
    res.status(201).json(objects);
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
  const newObjects = _.filter(objects, (object) => {
    return object.id != id;
  });
  res.status(200).json(newObjects);
});

module.exports = api;
