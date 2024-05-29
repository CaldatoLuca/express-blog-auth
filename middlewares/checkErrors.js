module.exports = (err, req, res, next) => {
  const statusCode = 500;
  res.format({
    html: () => res.status(statusCode).send("Errore " + err.message),
    json: () =>
      res
        .status(statusCode)
        .json({ status: statusCode, error: err.message, stack: err.stack }),
  });
};
