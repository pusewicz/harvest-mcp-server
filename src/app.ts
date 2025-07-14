import express from "express";
import cors from "cors";

import { PORT } from "./constants";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
