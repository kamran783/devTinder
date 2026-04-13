let adminAuth = (req, res, next) => {
  let token = "xyx";
  let isAuthorized = token === "xyx";
  if (!isAuthorized) {
    res.status(401).send("not authorized");
  } else {
    next();
  }
};
module.exports = {
    adminAuth,
}