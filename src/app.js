import express from "express";
import routes from "./routes/index.js"
import errorHandler from "./middlewares/errorHandler.js";

// Inicializa um servidor express
const app = express();

routes(app);
app.use(errorHandler);

export default app;