const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function isValidPassword(password) {

  // regex pattern to check Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordRegex.test(password);
}

const UserController = {
  async registerUser(req, res) {
    try {
      const { username, email, password, full_name, age, gender } = req.body;

      // Check if required fields are provided
      if (!username || !email || !password || !full_name) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_REQUEST",
          message:
            "Invalid request. Please provide all required fields: username, email, password, full_name.",
        });
      }

      // Check if username is already taken
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(409).json({
          status: "error",
          code: "USERNAME_EXISTS",
          message:
            "The provided username is already taken. Please choose a different username.",
        });
      }

      // Check if email is already registered
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({
          status: "error",
          code: "EMAIL_EXISTS",
          message:
            "The provided email is already registered. Please use a different email address.",
        });
      }

      // Validate age
      if (!Number.isInteger(age) || age <= 0) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_AGE",
          message: "Invalid age value. Age must be a positive integer.",
        });
      }

      // Check if gender is provided
      if (!gender) {
        return res.status(400).json({
          status: "error",
          code: "GENDER_REQUIRED",
          message:
            "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
        });
      }

      // Validate password requirements
      if (!isValidPassword(password)) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_PASSWORD",
          message:
            "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
        });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        full_name,
        age,
        gender,
      });

      return res.status(201).json({
        status: "success",
        message: "User successfully registered!",
        data: {
          user_id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          full_name: newUser.full_name,
          age: newUser.age,
          gender: newUser.gender,
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },

  async generateToken(req, res) {
    try {
      const { username, password } = req.body;

      // Check if username or password is empty
      if (!username || !password) {
        return res.status(401).json({
          status: "error",
          code: "MISSING_FIELDS",
          message: "Missing fields. Please provide both username and password.",
        });
      }

      const user = await User.findOne({
        where: {
          username,
        },
      });

      // if user not found or password not matched
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          status: "error",
          code: "INVALID_CREDENTIALS",
          message:
            "Invalid credentials. The provided username or password is incorrect.",
        });
      }

      // create JWT token
      const accessToken = jwt.sign({ user_id: user.id },process.env.JWT_SECRET_KEY , {
        expiresIn: "1h",
      });

      return res.status(200).json({
        status: "success",
        message: "Access token generated successfully.",
        data: {
          access_token: accessToken,
          expires_in: 3600,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },
};

module.exports = UserController;
