const http = require("http");
const express = require("express");
const consola = require("consola");
const router = require("./src/router.js");
const api = require("./src/api.js");
const morgan = require("morgan");

const app = express();

//settings
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;
app.set("port", port);

async function run() {
  app.disable("x-powered-by"); // QUESTION: any reason is this line here?
  // This line is used to protected our app from attackers who use "x-powered-by" headers (which is enabled by default)
  // to detect apps running Express and then launch specifically targeted attacks.
  // We need to add this line unless we are using some middleware like Helmet.

  //middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/", router);
  app.use("/api", api);

  const server = http.createServer(app);

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

run();

module.exports = app;
