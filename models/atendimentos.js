const moment = require('moment')
const connection = require('../infra/database/connection')
const axios = require('axios')
const repository = require('../repositories/atendimento')
class Atendimento {
  constructor() {
    this.dataValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)

    this.clienteValido = ({ tamanho }) => tamanho >= 5

    this.valida = (params) => this.validacoes.filter(campo => {
      const { nome } = campo
      const param = params[nome]

      return !campo.valido(param)
    })

    this.validacoes = [
      {
        nome: 'data',
        valido: this.dataValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: this.clienteValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]
  }

  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')

    const params = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
    }

    const erros = this.valida(params)
    const existErrors = erros.length

    if (existErrors) {
      return new Promise((resolve, reject) => reject(erros))
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }

      return repository.adiciona(atendimentoDatado)
        .then((resultados) => {
          const id = resultados.insertId
          return ({ ...atendimentoDatado, id })
        })
    }
  }
  lista() {
    return repository.lista()
  }
  unique(id) {
    return repository.unique(id)
      .then(async (resultado) => {
        const atendimento = resultado[0]
        const cpf = atendimento.cliente
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)

        atendimento.cliente = data;

        return atendimento
      })
  }
  update(id, values) {

    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')
    }

    return repository.update(id, values)
      .then((resultados) => {
        return ({ values, id })
      })
  }
  delete(id) {
    return repository.delete(id)
  }
}

module.exports = new Atendimento