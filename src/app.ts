import * as express from "express";
import * as cors from "cors";
import { router } from "./routes";
import { ErrorHandler } from "./Middlewares/ErrorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

const errorHandler = new ErrorHandler();

app.use(errorHandler.error);
app.use(errorHandler.notFound);

export { app };
