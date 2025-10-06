import Joi from 'joi';

export const branchSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.string().min(7).max(20).required(),
});
