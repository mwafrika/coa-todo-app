import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is a required field",
  }),
  description: Joi.string().min(3).max(200).required().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description should have a minimum length of {#limit}",
    "string.max": "Description should have a maximum length of {#limit}",
    "any.required": "Description is a required field",
  }),

  isCompleted: Joi.boolean().optional().messages({
    "boolean.base": "isCompleted should be a boolean",
    "any.required": "isCompleted is a required field",
  }),

  date: Joi.date().greater("now").required().messages({
    "date.base": "Date should be a date",
    "date.empty": "Date cannot be empty",
    "date.greater": "Date cannot be in the past",
    "any.required": "Date is a required field",
  }),
});

export default schema;
