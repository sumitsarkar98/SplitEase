const periodMiddleware = (req, res, next) => {
  let { period } = req.query;

  // default
  if (!period) period = "month";

  // normalize
  const allowed = ["week", "month", "year"];
  if (!allowed.includes(period)) {
    period = "month";
  }

  req.period = period;

  next();
};

export { periodMiddleware };
