//Importo express e creo il router
const express = require("express");
const router = express.Router();
const multer = require("multer");

//Importo il controller per richiamare i metodi
const postController = require("../controllers/postController");

//Middlewares
const checkPostExist = require("../middlewares/checkPostExist");
const uploader = multer({ dest: "public/imgs/posts" });
const { authenticateJWT } = require("../controllers/authController");
const isAdmin = require("../middlewares/isAdmin");
router.use(express.urlencoded({ extended: true })); //x-www-urlencoded - lascia true(analizza anche aray e oggetti)
//app.use(express.json()); //json

//Pagina lista con metodo index
router.get("/", postController.index);

//Store - creazione di un nuovo post
//Middleware multer per upload immagine, alla chiave valore image
router.post(
  "/",
  authenticateJWT,
  uploader.single("image"),
  postController.store
);

//Dettaglio post con metodo show
router.get("/:slug", checkPostExist, postController.show);

//Cancellazione di post con metodo destroy
router.delete(
  "/:slug",
  authenticateJWT,
  isAdmin,
  checkPostExist,
  postController.destroy
);

//Download con metodo download
router.get("/:slug/download", postController.download);

module.exports = router;
