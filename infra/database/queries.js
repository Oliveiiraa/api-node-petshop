const connection = require('./connection')

const executaQuery = (query, param = '') => {
  return new Promise((resolve, reject) => {
    connection.query(query, param, (erros, resultados, campos) => {
      if (erros) {
        reject(erros)
      } else {
        resolve(resultados)
      }
    })
  })
}

module.exports = executaQuery