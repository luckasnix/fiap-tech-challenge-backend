const TransactionDTO = require('../models/DetailedAccount')


class AccountController {
  constructor(di = {}) {
    this.di = Object.assign({
      userRepository: require('../infra/mongoose/repository/userRepository'),
      accountRepository: require('../infra/mongoose/repository/accountRepository'),
      cardRepository: require('../infra/mongoose/repository/cardRepository'),
      transactionRepository: require('../infra/mongoose/repository/detailedAccountRepository'),

      saveCard: require('../feature/Card/saveCard'),
      salvarUsuario: require('../feature/User/salvarUsuario'),
      saveAccount: require('../feature/Account/saveAccount'),
      getUser: require('../feature/User/getUser'),
      getAccount: require('../feature/Account/getAccount'),
      saveTransaction: require('../feature/Transaction/saveTransaction'),
      getTransaction: require('../feature/Transaction/getTransaction'),
      getCard: require('../feature/Card/getCard'),
    }, di)
  }

  async find(req, res) {
    const { accountRepository, getAccount, getCard, getTransaction, transactionRepository, cardRepository } = this.di

    try {
      const userId = req.user.id
      const account = await getAccount({ repository: accountRepository,  filter: { userId } })
      const transactions = await getTransaction({ filter: { accountId: account[0].id }, repository: transactionRepository })
      const cards = await getCard({ filter: { accountId: account[0].id }, repository: cardRepository })
    
      res.status(200).json({
        message: 'Conta encontrada carregado com sucesso',
        result: {
          account,
          transactions,
          cards,
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'Erro no servidor'
      })
    }
    
  }

  async createTransaction(req, res) {
    const { saveTransaction, transactionRepository, getAccount, accountRepository } = this.di;
    const { value, type, from, to, anexo } = req.body;
    const { id: userId } = req.user;

    try {
      const [account] = await getAccount({ repository: accountRepository, filter: { userId } });

      if (!account) {
        return res.status(404).json({ message: 'Conta do usuário não encontrada.' });
      }

      const transactionDTO = new TransactionDTO({ accountId: account.id, value, from, to, anexo, type, date: new Date() });

      const transaction = await saveTransaction({ transaction: transactionDTO, repository: transactionRepository });

      res.status(201).json({
        message: 'Transação criada com sucesso',
        result: transaction
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar transação.' });
    }
  }

  async getStatment(req, res) {
    const { getTransaction, transactionRepository, getAccount, accountRepository } = this.di
    const { id: userId } = req.user;

    try {
      const [account] = await getAccount({ repository: accountRepository, filter: { userId } });

      if (!account) {
        return res.status(404).json({ message: 'Conta do usuário não encontrada.' });
      }
      const transactions = await getTransaction({ filter: { accountId: account.id } ,  repository: transactionRepository})
      res.status(200).json({
        message: 'Lista de transações encontrada',
        result: {
          transactions
        }
      })
    }catch (error) {
      res.status(500).json({ message: 'Erro ao criar transação.' });
    }

  }
}

module.exports = AccountController