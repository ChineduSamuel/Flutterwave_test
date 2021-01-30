const { checkCondition } = require('../utils/helpers');
const get = require('lodash.get');



exports.homeHandler = (req, res) => {
 res.status(200);
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Chinedu Samuel",
      github: "@ChineduSamuel",
      email: "samuelchinedufranklin@gmail.com",
      mobile: "08135398131",
      twitter: "@devchinedu",
    },
  });



   return res.status(200).send;
}

exports.validateHandler = (req, res) => {
    const { field, condition, condition_value } = req.value.rule;
    console.log(req.value.rule)
    const fieldValue = get(req.value.data, field);
    console.log(fieldValue)
    if (fieldValue === undefined) return res.status(400).send({ status: 'success', data: null, message: `field ${field} is missing from data.` });
    const result = checkCondition(fieldValue, condition_value, condition, field);
    if (result.error) return res.status(400).send({ status: 'error', data: { validation: result }, message: `field ${field} failed validation.` });
    return res.status(200).send({ status: 'success', data: { validation: result }, message: `field ${field} successfully validated.` });
}