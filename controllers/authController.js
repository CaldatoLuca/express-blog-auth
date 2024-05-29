//imports
const jwt = require("jsonwebtoken"); //jwt
require("dotenv").config(); //dotenv

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

module.exports = {
  generateToken,
};
