const query = require('../infra/database/queries');

class Atendimento {
  adiciona(atendimento) {
    const sql = `INSERT INTO Atendimentos SET ?`;

    return query(sql, atendimento);
  }
  lista() {
    const sql = `SELECT * FROM Atendimentos`;

    return query(sql);
  }
  unique(id) {
    const sql = `SELECT * FROM Atendimentos where id=${id}`;

    return query(sql);
  }
  update(id, values) {
    const sql = `UPDATE Atendimentos SET ? WHERE id=?`

    return query(sql, [values, id]);
  }
  delete(id) {
    const sql = `DELETE FROM Atendimentos where id=${id}`

    return query(sql);
  }
}

module.exports = new Atendimento