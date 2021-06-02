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

// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", function (req, res) {
  res.json(objects);
});

api.post("/objects", function (req, res) {
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

api.put("/objects/:id", (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  if (name && value) {
    _.each(objects, (object, i) => {
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

api.delete("/objects/:id", (req, res) => {
  const { id } = req.params;
  const newObjects = _.filter(objects, (object) => {
    return object.id != id;
  });
  res.status(200).json(newObjects);
});

module.exports = api;
