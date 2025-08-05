const articles = [
  { id: 1, name: "Socks" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Passion" },
];

const list = (req, res) => {
  // const limit = req.query.limit??10;
  const limit = req.query.limit;
  // s'il ya une limit
  if (limit) {
    // On extrait la portion du tableau demandé
    const limitedResults = articles.slice(0, limit);
    res.json(limitedResults);
  } else res.json(articles);
};

export const show = (req, res) => {
  const wantedId = parseInt(req.params.id);

  //const article = articles.find((article) => article.id === wantedId);
  const article = articles.find((article) => {
    return article.id === wantedId;
  });

  if (article != null) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
};

export const insert = (req, res) => {
  // verification, est-ce que body est invalide?
  //if(req.body){
  if (req.body == undefined) {
    return res.sendStatus(400);
  }
  // On prend les données du POST
  const article = req.body;
  articles.push(article);
  res.status(201).json({ message: "Ajouté", article: article });
};

export const update = (req, res) => {
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
};

export const remove = (req, res) => {
  const id = parseInt(req.params.id);
  // On verifie si l’id existe
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  articles.splice(index, 1);
  res.json({ message: `article #${id} supprimé` });
};

export default list;
