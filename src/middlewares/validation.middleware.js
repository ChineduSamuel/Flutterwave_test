const Joi = require('joi');

const ruleSchema = Joi.object().keys({
  field: Joi.string().required(),
  condition: Joi.string().required().valid().required(),
  condition_value: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.array()).required().allow(null, ''),
});

const validateSchema = Joi.object().keys({
  rule: ruleSchema.required(),
  data: Joi.alternatives().try(Joi.array().min(1), Joi.object(), Joi.string()).required(),
});

module.exports = (req, res, next) => {
const { error, value } = validateSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
    message:  `${error.details[0].message}.`
      .replace(/\"/g, '')
      .replace('of type','an')
      .replace('must', 'should'),

    status: 'fail',
    data: null,
    })
  }
  req.value = value;
  return next();
}
