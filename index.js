import express from "express";
import showMessage from "./src/controller.js";

const app = express();

app.use("/", showMessage);

const PORT = 5000;

app.listen(PORT, (req, res) => {
  console.log(`listening on ${PORT}`);
});

export default app;
