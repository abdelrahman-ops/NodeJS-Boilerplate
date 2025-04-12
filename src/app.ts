import express from "express";
import routes from "./api/routes";
import {json} from "body-parser";
import cors from "cors";
import { setupSwagger } from './config/swagger';
import morgan from "morgan";
// import { graphqlHTTP } from 'express-graphql';
// import { schema } from './api/graphql/schema';
import restRoutes from './api/routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const mode = process.env.API_MODE;


app.use(express.json());
app.use(json());


const corsOptions = {
  origin: [
    'http://localhost:5000', 
    'https://your-production-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));


if (mode === 'rest' || mode === 'hybrid') {
  app.use('/api', restRoutes);
}

// if (mode === 'graphql' || mode === 'hybrid') {
//   app.use(
//     '/graphql',
//     graphqlHTTP({
//       schema,
//       graphiql: true,
//     })
//   );
// }

app.use(notFoundHandler);
app.use(errorHandler);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", routes);

if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app);
}

app.get("/", (_req, res) => {
  res.send("API is up and running!");
});


export default app;
