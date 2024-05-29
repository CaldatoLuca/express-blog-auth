const path = require("path");
const fs = require("fs");

/**
 * Genera un slug da una stringa passata come parametro, arr di slug per vedere se univoco
 * @param {string} str
 * @param {array} arr
 */
const generateSlug = (str, arr) => {
  const baseSlug = str.replaceAll(" ", "-").toLowerCase().replaceAll("/", "");

  let count = 1;
  let slug = baseSlug;
  while (arr.includes(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
};

/**
 * Dato il nome di un file json, restituisce i dati contenuti nel file
 * @param {string} fileName
 */
const readJSON = (fileName) => {
  const filePath = path.join(__dirname, `db/${fileName}.json`);
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
};

/**
 * Dato il nome di un file json, sovrascrive il file con i dati passati come array
 * @param {string} fileName
 * @param {array} data
 */
const writeJSON = (fileName, data) => {
  const filePath = path.join(__dirname, `db/${fileName}.json`);
  const json = JSON.stringify(data);
  fs.writeFileSync(filePath, json);
};

/**
 * Dato il nome di un file json, elimina dal file il dato con lo slug
 * @param {string} fileName
 * @param {string} slug
 */
const removePost = (fileName, slug) => {
  const data = readJSON(fileName);
  const updatedData = data.filter((post) => post.slug !== slug);
  writeJSON(fileName, updatedData);
};

/**
 * passato il nome del file immagine lo elimina da public/imgs/posts
 * @param {string} fileName
 */
const deletePublicFile = (fileName) => {
  const filePath = path.join(__dirname, "/public/imgs/posts", fileName);
  fs.unlinkSync(filePath);
};

module.exports = {
  generateSlug,
  writeJSON,
  removePost,
  deletePublicFile,
  readJSON,
};
