const periodMiddleware = (req, res, next) => {
  let { period } = req.query;

  if (!period) period = "monthly";

  const allowed = ["weekly", "monthly", "yearly"];

  if (!allowed.includes(period)) {
    period = "monthly";
  }

  req.period = period;
  next();
};

export { periodMiddleware };
