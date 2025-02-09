import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import qrCode from "qrcode";
import speakeasy from "speakeasy";
import User from "../models/user.js";

// 1st function that will be called when the user will be registering initially.
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword, // store hashed password
      isMFAactive: false,
    });
    console.log("New user: " + newUser);
    await newUser.save();
    res.status(201).json({ message: "New user registerd successfully" });
  } catch (error) {
    req
      .status(500)
      .json({ error: "Error registering user", message: error.message });
  }
};

// 2nd function that will we called when user will be login in the server
export const login = async (req, res) => {
  console.log("The authenticated user is :", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMFAactive: req.user.isMFAactive,
  });
};

// 3rd function that will we called by auth status that is it will we helping to the correvt staus of the user all the credentials that he/ she is logged in or not

// only get req method
export const authstatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMFAactive: req.user.isMFAactive,
    });
  } else {
    res.status(401).json({ message: "unauthorized user" });
  }
};

// 4th function logout that will log u out from the interface
export const logout = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "unauthorized user" }); // if user had already logged out then
  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User not logged in" });
    res.status(200).json({ message: "logout successfull" });
  });
};
/**--------------------------------------------2 factor authentication functions --------------------------------------------------------------------* */
export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is:", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret object is: ", secret);
    user.twoFactorSecret = secret.base32;
    user.isMFAactive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.google.com",
      encoding: "base32",
    });
    const qrImageurl = await qrCode.toDataURL(url);
    res.status(200).json({
      message: "   verification    ",
      secret: secret.base32, // need to hide
      qrCode: qrImageurl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error setting up 2fa", message: error.message });
  }
};
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ message: "2fa verified", token: jwtToken });
  } else {
    res.status(400).json({ message: "Invalid 2fa Token" });
  }
};

export const reset = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMFAactive = false;
    await user.save();
    res.status(200).json({ message: "2fa reset sucssful" });
  } catch (error) {
    res.status(500).json({ error: "error reseting 2FA", message: error });
  }
};
