const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) res.status(401).send("Unuauthorised Access");
  else next();
};

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) res.status(401).send("Unuauthorised Access");
  else next();
};

module.exports = { userAuth, adminAuth };
