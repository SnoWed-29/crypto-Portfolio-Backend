const Portfolio = require('../models/portfolio.model');
const User = require('../models/user.model');

class PortfolioController {
  async createPortfolio(req, res) {
    try {
      const { name, balance, userId } = req.body;
      const portfolio = await Portfolio.create({ name, balance, userId });
      res.status(201).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPortfolios(req, res) {
    try {
      const portfolios = await Portfolio.findAll();
      res.status(200).json(portfolios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPortfolioById(req, res) {
    try {
      const { id } = req.params;
      const portfolio = await Portfolio.findByPk(id);
      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }
      res.status(200).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updatePortfolio(req, res) {
    try {
      const { id } = req.params;
      const { name, balance, userId } = req.body;
      const portfolio = await Portfolio.findByPk(id);
      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }
      portfolio.name = name;
      portfolio.balance = balance;
      portfolio.userId = userId;
      await portfolio.save();
      res.status(200).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePortfolio(req, res) {
    try {
      const { id } = req.params;
      const portfolio = await Portfolio.findByPk(id);
      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }
      await portfolio.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new PortfolioController();