import Joi from "joi";

const createTaskValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      subject: Joi.string().required(),
      projectId: Joi.string(),
      assignedTo: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      discription: Joi.string(),
      followers: Joi.array().required(),
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

const updateTaskValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      subject: Joi.string(),
      projectId: Joi.string(),
      assignedTo: Joi.string(),
      startDate: Joi.string(),
      endDate: Joi.string(),
      discription: Joi.string(),
      followers: Joi.array(),
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

const updateReminderValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      reminder: Joi.string(),
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

const updateStatusValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      status: Joi.string().valid("COMPLETE", "TESTING", "IN PROGRESS"),
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
  createTaskValidation,
  updateTaskValidation,
  updateStatusValidation,
  updateReminderValidation,
};
