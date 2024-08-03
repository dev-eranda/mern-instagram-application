const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../keys");
const requireLogin = require('../middleware/requireLogin')

const generateAccessToken = (user) => {
  console.log("acccc",user)
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: "10s" }
  );
};

const generateRefreshToken = (user) => {
  console.log("refresh", user)

  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: "15s" }

  );
};

let refreshTokens = [];


const signupSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

router.post("/signup", async (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const { name, email, password } = value;

  try {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User alreasy exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});


router.post("/signin", async (req, res) => {
  const { error, value } = signinSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(422)
        .json({ error: "Sorry, your email or password was incorrect." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      const { _id, name, email } = user;

      const roles = [2001, 1984]

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: { _id, name, email, roles

         },
      });
    } else {
      return res
        .status(422)
        .json({ error: "Sorry, your email or password was incorrect." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("500 Internal server error");
  }
});

router.post("/refresh", async (req, res) => {
  //take the refresh token from user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!");
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (error, user) => {
    if (error) {
      console.error("Refresh token verification failed:", error);
      return res.status(403).json({ message: "Refresh token is not valid!" });
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

router.get("/user", requireLogin, async (req, res) => {
  const currentUser = req.user
  res.status(200).json(currentUser)
});

router.post("/logout", requireLogin, async (req, res) => {
  const refreshToken = req.body.token
  refreshTokens = refreshTokens.filter(token => token !== refreshToken)
  res.status(200).json("You logged out successfully")
});


module.exports = router;
