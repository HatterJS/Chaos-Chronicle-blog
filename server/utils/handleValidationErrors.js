import { validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors
        .array()
        .map((item) => item.msg)
        .join("\n"),
    });
  }
  next();
};

export default handleValidationErrors;
