const User = require('../models/user.model');

class AuthController {
  async registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({
        name: "Name is required",
        email: "Email is required",
        password: "Password is required",
      });
    }
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving user to the database" });
    }
  }

  logoutUser(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: "User logged out successfully" });
    });
  }
}

module.exports = new AuthController();