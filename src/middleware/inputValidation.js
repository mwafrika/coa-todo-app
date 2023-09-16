import { StatusCodes } from "http-status-codes";
import schema from "../schema";

function validateData(req, res, next) {
  const data = req.body;
  const { error } = schema.validate(data);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
  }
  next();
}
export default validateData;
