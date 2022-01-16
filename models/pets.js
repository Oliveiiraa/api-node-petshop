const connection = require('../infra/connection');
const uploadArquvios = require('../arquivos/uploadArquivos');

class Pet {
  adiciona(pet, res) {
    const query = `INSERT INTO Pets SET ?`

    uploadArquvios(pet.imagem, pet.nome, (erro, novoCaminho) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        const novoPet = { ...pet, imagem: novoCaminho }

        connection.query(query, novoPet, erro => {
          if (erro) {
            res.status(400).json(erro)
          } else {
            res.status(201).json(novoPet)
          }
        })
      }
    })
  }
}

module.exports = new Pet