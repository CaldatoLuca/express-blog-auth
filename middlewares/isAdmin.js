const users = require("../db/users.json");

module.exports = (req, res, next) => {
  const user = users.find(
    (u) => u.id === req.user.id && u.username === req.user.username
  );

  if (!user || !users.includes(user)) {
    return res.status(404).json({
      message: "User non trovato",
    });
  }

  if (user.role !== "admin") {
    return res.status(401).json({
      message: "Non hai i permessi per accedere a questa pagina",
    });
  }

  req.checkedUser = user;
  next();
};
