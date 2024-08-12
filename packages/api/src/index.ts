import { createExpressEndpoints, initServer } from "@ts-rest/express";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { contract } from "contract"
import { generateOpenApi } from "@ts-rest/open-api";
import swaggerUi from "swagger-ui-express";
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

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "Test API description",

  }
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
