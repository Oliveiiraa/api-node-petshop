const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista()
      .then(atendimentos => res.json(atendimentos))
      .catch(erro => res.status(500).json(erro))
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.unique(id)
      .then(atendimento => res.json(atendimento))
      .catch(erro => res.status(500).json(erro))
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;

    Atendimento.adiciona(atendimento)
      .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
      .catch(erro => res.status(400).json(erro))
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    Atendimento.update(id, values)
      .then(atendimentoAtualizado => res.json(atendimentoAtualizado))
      .catch(erro => res.status(400).json(erro))
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimento.delete(id)
      .then(atendimento => res.status(204).json(atendimento))
      .catch(erro => res.status(400).json(erro))
  })
};