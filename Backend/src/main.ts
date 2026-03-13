import express from "express";
import { mainCofig } from "./config/configuration";
import { testDbConnection } from "./config/database/db";
import { taskRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRouter);

app.use(errorHandler);

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

async function startServer() {
  try {
    await testDbConnection();

    app.listen(mainCofig.PORT || 3000, () => {
      console.log("Server running successfully on port", mainCofig.PORT);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
}

startServer();
