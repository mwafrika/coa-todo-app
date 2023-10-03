import express from "express";
import routes from "./src/routes";
import dotenv from "dotenv";
import setPort from "./src/utils/manageEnv";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/v2", routes);

const environment = app.get("env");
const PORT = setPort(environment);
console.log(`Current environment: ${environment}- ${process.env.PORT}`);

app.listen(PORT, (req, res) => {
  console.log(`listening on ${PORT}`);
});

export default app;
