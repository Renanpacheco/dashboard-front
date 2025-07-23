const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async register(req, res) {
    const { name, email, password, confirm } = req.body;

    if (confirm != password) {
      res
        .status(422)
        .json({ message: "password and confirm need to be equals" });
      return;
    }

    const checIfUserExists = await User.findOne({ where: { email: email } });

    if (checIfUserExists) {
      res.status(422).json({ message: "this email alredy exists" });
      return;
    }

    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);
      res.status(200).json({ message: "success registred user", createdUser });
      return;
    } catch (error) {
      console.error(error);
      res.status(500);
      return;
    }
  }
};
