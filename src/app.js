import express from "express";
import trilhasController from "./controller/trilhas-controller.js";
import usersController from "./controller/users-controller.js";
import contentController from "./controller/content-controller.js";
import dbSq from "./database/db-sqlite.js";

const app = express();

app.use(express.json());

trilhasController(app, dbSq);
contentController(app, dbSq);
usersController(app, dbSq);

export default app;
