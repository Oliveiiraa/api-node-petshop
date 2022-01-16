const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callBackImagemCriada) => {
  const tiposValidos = ['jpg', 'png', 'jpeg'];
  const tipo = path.extname(caminho)
  const tipoIsValid = tiposValidos.indexOf(tipo.substring(1)) !== -1

  if (!tipoIsValid) {
    const erro = "Tipo de arquivo inválido"
    callBackImagemCriada(erro)
  } else {
    const novoCaminho = `./assets/img/${nomeDoArquivo}${tipo}`

    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novoCaminho))
      .on('finish', () => callBackImagemCriada(false, novoCaminho))
  }
}

// // Função para ler o arquivo com buffer (Sincrona)
// fs.createReadStream('./assets/salsicha.jpg', (err, data) => {
//   if (err) {
//     console.log(err)
//   }

//   fs.writeFile('./assets/salsicha3.jpg', data, (err) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log('Imagem foi escrita')
//   })
// })

// // Função para ler o arquivo com stream (Assincrona)
// fs.createReadStream('./assets/salsicha.jpg')
//   .pipe(fs.createWriteStream('./assets/salsicha2.jpg'))
//   .on('finish', () => console.log('Arquivo copiado com sucesso'))