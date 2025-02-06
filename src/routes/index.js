const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/firebase-auth-controller');

const portfolioController = require('../controllers/portfolioController');
const transactionController = require('../controllers/transactionController');
router.post('/api/register', authController.registerUser);
router.post('/api/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
router.post('/api/logout', authController.logoutUser);
router.get('/api/check', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
router.get('/api/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user }); 
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

router.post('/api/portfolios', portfolioController.createPortfolio);
router.get('/api/portfolios', portfolioController.getPortfolios);
router.get('/api/portfolios/:id', portfolioController.getPortfolioById);
router.put('/api/portfolios/:id', portfolioController.updatePortfolio);
router.delete('/api/portfolios/:id', portfolioController.deletePortfolio);

router.get('/api/transactions/:id/portfolio', transactionController.getPortfolioTransaction);
router.post('/api/transactions', transactionController.createTransaction);
router.get('/api/transactions', transactionController.getTransactions);
router.get('/api/transactions/:id', transactionController.getTransactionById);
router.put('/api/transactions/:id', transactionController.updateTransaction);
router.delete('/api/transactions/:id', transactionController.deleteTransaction);

module.exports = router;