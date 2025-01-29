const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
   } = require('firebase/auth');
const { auth } = require('../config/firebase'); // Adjust the path as necessary
const User = require('../models/user.model'); // Adjust the path as necessary

class FirebaseAuthController {
  registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({
        name: "Name is required",
        email: "Email is required",
        password: "Password is required",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Save user to the database
        User.create({ name, email })
          .then(() => {
            const idToken = userCredential._tokenResponse.idToken;
            if (idToken) {
              res.cookie('access_token', idToken, {
                httpOnly: false,
                sameSite: 'None', // Ensure this is set to 'None' for cross-site requests
                secure: true
              });
              res.status(201).json({ message: "User created successfully!" });
            } else {
              res.status(500).json({ error: "Internal Server Error" });
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error saving user to the database" });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || "An error occurred while registering user";
        res.status(500).json({ error: errorMessage });
      });
  }
  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        if (idToken) {
          res.cookie('access_token', idToken, {
            httpOnly: false,
            sameSite: 'None', // Ensure this is set to 'None' for cross-site requests
            secure: true
          });
          res.status(200).json({ message: "User logged in successfully", userCredential });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message || "An error occurred while logging in";
        res.status(500).json({ error: errorMessage });
      });
  }
  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token');
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
}
}

module.exports = new FirebaseAuthController();