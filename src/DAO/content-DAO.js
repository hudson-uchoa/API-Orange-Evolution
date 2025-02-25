import ErrStatus from "../model/Error.js";

class ContentDAO {
  constructor(db) {
    this.db = db;
  }

  getById = (idContent) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM CONTEUDOS WHERE ID = ?",
        idContent,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudo: row,
              error: false,
            });
          }
        }
      );
    });
  };

  getAllUserContent = () => {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM USUARIO_CONTEUDO", (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            conteudos: rows,
            error: false,
          });
        }
      });
    });
  };

  getAllContentDoneByUserIdAndTrailId = (idUser, idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN USUARIO_CONTEUDO ON CONTEUDOS.ID = CONTEUDO_ID INNER JOIN MODULOS ON MODULOS.ID = MODULO_ID INNER JOIN TRILHAS ON TRILHAS.ID = TRILHA_ID WHERE DONE = 1 AND TRILHAS.ID = ? AND USUARIO_ID = ? GROUP BY CONTEUDOS.ID",
        idTrail,
        idUser,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  getAllContentDoneByUserIdAndModuleId = (idUser, idModule) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN USUARIO_CONTEUDO ON CONTEUDOS.ID = CONTEUDO_ID INNER JOIN MODULOS ON MODULOS.ID = MODULO_ID INNER JOIN TRILHAS ON TRILHAS.ID = TRILHA_ID WHERE DONE = 1 AND MODULOS.ID = ? AND USUARIO_ID = ? GROUP BY CONTEUDOS.ID",
        idModule,
        idUser,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  getLastContentDoneByUserIdAndModuleId = (idUser, idModule) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN USUARIO_CONTEUDO ON CONTEUDOS.ID = CONTEUDO_ID INNER JOIN MODULOS ON MODULOS.ID = MODULO_ID INNER JOIN TRILHAS ON TRILHAS.ID = TRILHA_ID WHERE DONE = 1 AND MODULOS.ID = ? AND USUARIO_ID = ? ORDER BY CONTEUDOS.ID DESC LIMIT 1",
        idModule,
        idUser,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudo: row,
              error: false,
            });
          }
        }
      );
    });
  };

  getAllContentByTrailId = (idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT CONTEUDOS.ID, CONTEUDOS.TITULO, CONTEUDOS.TIPO, CONTEUDOS.DURACAO, CONTEUDOS.FONTE, CONTEUDOS.DESCRICAO, CONTEUDOS.TAG, CONTEUDOS.MODULO_ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULOS.ID = MODULO_ID INNER JOIN TRILHAS ON TRILHA_ID = TRILHAS.ID WHERE TRILHAS.ID = ?",
        idTrail,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  getFirstContent = (idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULO_ID = MODULOS.ID INNER JOIN TRILHAS ON TRILHAS.ID = MODULOS.TRILHA_ID WHERE TRILHAS.ID = ? LIMIT 1",
        idTrail,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudo: row,
              error: false,
            });
          }
        }
      );
    });
  };

  getFirstContentOfModule = (idModule) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULO_ID = MODULOS.ID WHERE MODULOS.ID = ? LIMIT 1",
        idModule,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudo: row,
              error: false,
            });
          }
        }
      );
    });
  };

  getByIdModule = (idModule) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT CONTEUDOS.ID, CONTEUDOS.TITULO, CONTEUDOS.TIPO, CONTEUDOS.DURACAO, CONTEUDOS.FONTE, CONTEUDOS.DESCRICAO, CONTEUDOS.TAG, CONTEUDOS.MODULO_ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULOS.ID = CONTEUDOS.MODULO_ID WHERE MODULOS.ID = ?",
        idModule,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  postContent = (newContent) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO CONTEUDOS VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        null,
        ...Object.values(newContent),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: "Conteudo adicionado com sucesso!",
              conteudo: newContent,
              error: false,
            });
          }
        }
      );
    });
  };

  postContentUser = (idUser, idContent, done) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO USUARIO_CONTEUDO VALUES(?, ?, ?, ?)",
        null,
        idUser,
        idContent,
        done,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Registro de conteudo inserido com sucesso!`,
              error: false,
            });
          }
        }
      );
    });
  };

  putContent = (id, content) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE CONTEUDOS SET TITULO = ?, TIPO = ?, DURACAO = ?, FONTE = ?, DESCRICAO = ?, TAG = ?, MODULO_ID = ? WHERE ID = ?",
        ...Object.values(content),
        id,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Conteudo de id ${id} atualizado com sucesso!`,
              conteudo: content,
              error: false,
            });
          }
        }
      );
    });
  };

  deleteContent = (id) => {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM CONTEUDOS WHERE ID = ?", id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            msg: `Conteudo de id ${id} removido com sucesso!`,
            error: false,
          });
        }
      });
    });
  };

  deleteContentUser = (idUser, idContent) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "DELETE FROM USUARIO_CONTEUDO WHERE USUARIO_ID = ? AND CONTEUDO_ID = ?",
        idUser,
        idContent,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Registro de usuario ${idUser} e conteudo ${idContent} removido com sucesso!`,
            });
          }
        }
      );
    });
  };

  _verifyId = async (idContent) => {
    const content = await this.getById(idContent);
    if (content.conteudo === undefined) {
      throw new ErrStatus(`Conteudo de id ${idContent} não encontrado.`, 404);
    }

    return content;
  };
}

export default ContentDAO;
