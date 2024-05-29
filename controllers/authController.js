//imports
const jwt = require("jsonwebtoken"); //jwt
require("dotenv").config(); //dotenv
const users = require("../db/users.json"); //users db

/**
 * Raccogli lo user che fa login e crea un token personale
 * dando anche una scadenza
 * @param {object} user
 */
const generateToken = (user) => {
  //Il payload per la creazione del token è personale ma non ha bisogno di tutte le info
  //sopratutto rischiose, anche se criptate, come la psw
  const payload = {
    id: user.id,
    username: user.username,
  };

  //creo il token con
  //payload + password(del mio server) + scadenza
  const token = jwt.sign(payload, process.env.JWT_PASSWORD, {
    expiresIn: "1h",
  });

  //NB: si puo ridurre ma per capire lascio cosi
  return token;
};

const login = (req, res) => {
  //ricevo dal form le info dello user
  const { username, password } = req.body;

  //trovo nel mio db degli users quello che si st loggando (è gia registrato a sistema)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  //controllo se esiste
  if (user) {
    //genero il token
    const token = generateToken(user);
    //invio il token al client
    res.status(200).json({ token });
  } else {
    res.status(404).json({ message: "Credenziali non valide" });
  }
};

module.exports = {
  generateToken,
  login,
};
