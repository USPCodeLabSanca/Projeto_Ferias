import app from "./src/app";

const PORT = 3000

// Esperando evento na PORT
app.listen(PORT, () => {
  console.log("server listening");
});