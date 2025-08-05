import express from "express";

import database from "./database.js";
const app = express();

app.use(express.json());

const serverPort = 3000;

// GET /articles
// /articles?limit=2
app.get("/articles", (req, res) => {
  // version destructurée
  // database.query("SELECT * FROM article").then(([articles]) => {
  database
    .query("SELECT * FROM article")
    .then((results) => {
      console.log(results);
      const [articles] = results;
      res.json(articles);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET /articles/:id
app.get("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM article WHERE id=?", [id])
    .then((results) => {
      console.log(results);
      const [articles] = results;
      if (articles.length > 0) {
        res.json(articles[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST
app.post("/articles", (req, res) => {
  // verification, est-ce que body est invalide?
  //if(req.body){
  if (req.body == undefined) {
    return res.sendStatus(400);
  }
  // On prend les données du POST
  const article = req.body;
  articles.push(article);
  res.status(201).json({ message: "Ajouté", article: article });
});

// PUT
app.put("/articles/:id", (req, res) => {
  // verification, est-ce que body est invalide?
  //if(req.body){
  if (req.body == undefined) {
    return res.sendStatus(400);
  }
  const id = parseInt(req.params.id);
  // On verifie si l’id existe
  const index = articles.findIndex((t) => t.id === id);
  console.log("Index : ", index, "\n");
  if (index === -1) {
    return res.sendStatus(404);
  }
  articles[index] = req.body;
  res.json({ message: "Modifié", article: req.body });
});

// DELETE
app.delete("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // On verifie si l’id existe
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  articles.splice(index, 1);
  res.json({ message: `article #${id} supprimé` });
});

app.get("/", (req, res) => {
  console.log("J'ai une requête : ", req);
  res.send("Hello Student !!!");
});

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
