const Transaction = require('../models/transaction.model');
const Portfolio = require('../models/portfolio.model');

class TransactionController {
  async createTransaction(req, res) {
    try {
      const { coin, quantity, coinPrice, date, totalAmount, portfolioId } = req.body;
      const transaction = await Transaction.create({ coin, quantity, coinPrice, date, totalAmount, portfolioId });

      res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
async getPortfolioTransaction(req, res) {
  try {
    const { id } = req.params;
    const transactions = await Transaction.findAll({ where: { portfolioId: id } });
    // console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  
  async getTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll();
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTransactionById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const { coin, quantity, coinPrice, date, totalAmount, portfolioId } = req.body;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      transaction.coin = coin;
      transaction.quantity = quantity;
      transaction.coinPrice = coinPrice;
      transaction.date = date;
      transaction.totalAmount = totalAmount;
      transaction.portfolioId = portfolioId;
      await transaction.save();
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      await transaction.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new TransactionController();