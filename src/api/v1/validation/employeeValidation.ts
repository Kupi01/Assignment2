import Joi from 'joi';

export const employeeSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  branchId: Joi.string().required(),
});
