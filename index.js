const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection');
const tables = require('./infra/database/tables');

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log('Conectado com sucesso!');

    tables.init(connection);

    const app = customExpress();

    app.listen(3001, () => console.log('server started on port 3001'));
  }
});