import database from "./database.js";

const list = (req, res) => {
  database
    .query("select * from article")
    .then(([articles]) => {
      res.json(articles);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

export const show = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM article WHERE id=?", [id])
    .then(([articles]) => {
      if (articles[0]) {
        //
        res.json(articles[0]);
      } else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

export const insert = (req, res) => {
  // verification, est-ce que body est invalide?
  if (!req.body) {
    return res.sendStatus(400);
  }
  const { name } = req.body;

  database
    .query("INSERT INTO article (name) VALUES (?)", [name])
    .then(([result]) => {
      res.status(201).json({
        message: "Ajouté",
        id: result.insertId,
        name: name,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export const update = (req, res) => {
  // verification, est-ce que body est invalide?
  if (!req.body) {
    return res.sendStatus(400);
  }
  const id = parseInt(req.params.id);
  const { name } = req.body;
  database
    .query("UPDATE article SET name = ? WHERE id = ?", [name, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.json({
          message: "Modifié",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export const remove = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("DELETE FROM article WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.json({ message: `Article #${id} supprimé` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export default list;
