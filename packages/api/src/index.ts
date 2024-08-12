import { createExpressEndpoints, initServer } from "@ts-rest/express";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { contract } from "contract"
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer()

const router = s.router(contract, {
  getTest: async () => {
    return {
      status: 201,
      body: {
        name: "test",
        age: 20
      }
    }
  }
})

createExpressEndpoints(contract, router, app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
