import Joi from "joi";

const createTeamValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(25),
      member: Joi.array().required(),
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

export default createTeamValidation;
