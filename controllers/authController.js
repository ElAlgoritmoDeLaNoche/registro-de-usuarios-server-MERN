const { User, validateRegister } = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const crypto = require('crypto')

const RegisterUser = async (req, res) => {
  try {

    const { error } = validateRegister(req.body)

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    let user = await User.findOne({ email: req.body.email })

    if (user)
      return res.status(409).send({ message: 'User with given email already exists!' })

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    user = await new User({ ...req.body, password: hashPassword }).save()

    res.status(201).send({ message: 'Email success' })

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

const loginUser = async (req, res) => {
  try {

    const { error } = validateLogin(req.body)

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })

    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    res.status(200).send({ message: 'logged in successfully' })

  } catch (error) {
    res.status(500).send({ message: 'Internal  Error' })
  }
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  })
  return schema.validate(data)
}

module.exports = {
  RegisterUser,
  loginUser,
}
