import jwt from "jsonwebtoken";

const checkAuthorization = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "blog_secret_key");
      req.userId = decoded._id;
      next();
    } catch (err) {
      res.status(403).json({ message: "Доступ відсутній" });
    }
  } else {
    return res.status(403).json({ message: "Доступ відсутній" });
  }
};

export default checkAuthorization;
