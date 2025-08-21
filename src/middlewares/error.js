export default (err, req, res, next) => {
  console.error(err);
  // El enunciado pide este shape en caso de error:
  // { "code": 400, "errors": "could not connect to db" }
  res.status(400).json({
    code: 400,
    errors: err?.message || 'unexpected error'
  });
};
