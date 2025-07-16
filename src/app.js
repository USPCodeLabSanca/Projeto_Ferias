import express from "express";
import routes from "./routes/index.js"

// Inicializa um servidor express
const app = express();

routes(app);

export default app;