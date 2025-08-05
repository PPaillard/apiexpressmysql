import express from "express";

import list, { insert, remove, show, update } from "./ArticleController.js";

const app = express();

app.use(express.json());

const serverPort = 3000;

// GET /articles
// /articles?limit=2
app.get("/articles", list);

// GET /articles/:id
app.get("/articles/:id", show);

// POST
app.post("/articles", insert);

// PUT
app.put("/articles/:id", update);

// DELETE
app.delete("/articles/:id", remove);

app.get("/", (req, res) => {
  console.log("J'ai une requête : ", req);
  res.send("Hello Student !!!");
});

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
