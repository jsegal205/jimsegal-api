/**
 * Force load with https
 * https://devcenter.heroku.com/articles/http-routing#heroku-headers
 */
module.exports = () => {
  return (req, res, next) => {
    if (req.hostname !== "localhost") {
      if (req.headers["x-forwarded-proto"] !== "https") {
        res.redirect(302, "https://" + req.hostname + req.originalUrl);
      } else {
        next();
      }
    } else {
      next();
    }
  };
};
