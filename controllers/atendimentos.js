const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    return Atendimento.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return Atendimento.unique(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;

    return Atendimento.adiciona(atendimento, res)
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    return Atendimento.update(id, values, res)
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    return Atendimento.delete(id, res)
  })
};