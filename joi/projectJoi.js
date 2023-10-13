import Joi from "joi";

const createProjectValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(25),
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

const updateProjectValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(25),
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

export default { createProjectValidation, updateProjectValidation };
