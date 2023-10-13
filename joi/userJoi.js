import Joi from "joi";

//============  User registe validator  ==============//

const userRegisteValidator = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
        .required(),
      password: Joi.string().required().length(8),
      conformPassword: Joi.string().required().length(8),
      fullName: Joi.string().min(3).max(256),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.details[0].message.replace(/['"]/g, ""),
    });
  }
};

//============  User login validator  ==============//

const userLoginValidator = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
        .required(),
      password: Joi.string().required().length(8),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.details[0].message.replace(/['"]/g, ""),
    });
  }
};

//============  User forget password validator  ==============//

const userForgetPasswordValidator = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
        .required(),
      password: Joi.string().required().length(8),
      conformPassword: Joi.string().required().length(8),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.details[0].message.replace(/['"]/g, ""),
    });
  }
};

//============  User update validator  ==============//

const updateUserValidator = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      gender: Joi.string().valid("MALE", "FEMALE", "OTHER"),
      fullName: Joi.string().min(3).max(256),
      phoneNumber: Joi.string().length(10),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.details[0].message.replace(/['"]/g, ""),
    });
  }
};

export default {
  userRegisteValidator,
  userLoginValidator,
  userForgetPasswordValidator,
  updateUserValidator,
};
