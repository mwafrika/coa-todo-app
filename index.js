import express from "express";
import routes from "./src/routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/v1", routes);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`listening on ${PORT}`);
});

export default app;
