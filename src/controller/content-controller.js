import ContentDAO from "../DAO/content-DAO.js";

const contentController = (app, db) => {
  const contentDAO = new ContentDAO(db);

  app.get("/conteudo/idTrilha/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await contentDAO._verifyIdTrail(id);
      const content = await contentDAO.getFirstContent(id);
      res.status(200).json(content);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default contentController;
