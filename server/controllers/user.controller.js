const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  list,
  getByEmail,
  insert,
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function list(req, resp) {
  const users = await User.find({});
  return resp.json(users);
}

async function getByEmail(req, resp) {
  console.log(req.params)
  const user = await User.findOne({
    email: req.params.email
  });
  if (user) {
    return resp.json(user);  
  }
  return resp.json({"message":"Not found"});
}
