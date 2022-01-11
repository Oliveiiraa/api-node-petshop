class Tables {
  init(connection) {
    this.connection = connection;

    this.criarAtendimentos();
  }

  criarAtendimentos() {
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,
      nome varchar(50) NOT NULL,
      pet varchar(20) NULL,
      servico varchar(20) NOT NULL,
      data datetime NOT NULL,
      dataCriacao datetime NOT NULL,
      status varchar(20) NOT NULL,
      observacoes text NULL,
      PRIMARY KEY (id))`

    this.connection.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Atendimentos criada com sucesso!');
      }
    })

  }
}

module.exports = new Tables