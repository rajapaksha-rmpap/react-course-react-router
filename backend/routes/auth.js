const express = require("express");
const { add, get } = require("../data/user");
const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  }

  try {
    const existingUser = await get(data.email);
    if (existingUser)
      return res.status(409).json({
        message:
          "The Email has already been registered. Please try signing in.",
      });
  } catch (error) {}

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({
      message: "The email has not been registered. Try signing up instead.",
    });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid email or password",
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

module.exports = router;
