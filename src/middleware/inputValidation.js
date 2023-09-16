import { StatusCodes } from "http-status-codes";
import schema, { validateIdOnly } from "../schema";

export const validateData = (req, res, next) => {
  const data = req.body;
  const { error } = schema.validate(data);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
  }
  next();
};

export const validateID = (req, res, next) => {
  const { id } = req.params;
  const { error: idError } = validateIdOnly.validate({ id });
  if (idError) {
    const errorMessage = idError.details[0].message;
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
  }

  next();
};
