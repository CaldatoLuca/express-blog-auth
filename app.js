//CREAZIONE APP
const express = require("express");
const app = express();
const morgan = require("morgan");

//Routers
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");

//MIDDLEWARES
const notFound = require("./middlewares/notFound"); //pagina non trovata
const checkErrors = require("./middlewares/checkErrors"); //errori
app.use(express.static("public")); //visualizzazione file statici - img
app.use(morgan("dev")); //logger richieste

//ROTTE
app.get("/", (req, res) => {
  res.send("<h1>Benvenuti nel mio blog</h1> <a href='/posts'>Lista Posts</a>");
}); //home page

app.use("/posts", postRouter); //posts
app.use("/login", authRouter); //login

//MIDDLEWARES
app.use(notFound);
app.use(checkErrors);

//listen
app.listen(3000, () => {
  console.log(`Server pronto a http://localhost:3000`);
});
