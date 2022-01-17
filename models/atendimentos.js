const moment = require('moment')
const connection = require('../infra/connection')
const axios = require('axios')
class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')

    const dataValida = moment(data).isSameOrAfter(dataCriacao)
    const clienteValido = atendimento.cliente.length >= 5

    const validacoes = [
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existErrors = erros.length

    if (existErrors) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }
      const sql = `INSERT INTO Atendimentos SET ?`;

      connection.query(sql, atendimentoDatado, (erro, resultado) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }
  }
  lista(res) {
    const sql = `select * from Atendimentos`

    connection.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultado)
      }
    })
  }
  unique(id, res) {
    const sql = `SELECT * FROM Atendimentos where id=${id}`

    connection.query(sql, async (erro, resultado) => {
      const atendimento = resultado[0]
      const cpf = atendimento.cliente

      if (erro) {
        res.status(400).json(erro)
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)

        atendimento.cliente = data;

        res.status(200).json(atendimento)
      }
    })
  }
  update(id, values, res) {
    const sql = `UPDATE Atendimentos SET ? WHERE id=?`

    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')
    }

    connection.query(sql, [values, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(...values, id)
      }
    })
  }
  delete(id, res) {
    const sql = `DELETE FROM Atendimentos where id=${id}`

    connection.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }
}

module.exports = new Atendimento