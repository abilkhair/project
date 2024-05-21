import cors from "cors";
import App from "./app";
import logger from "./middlewares/logger";
import 'reflect-metadata';
import { MessageRoute } from "./routes/message.routes";
const app = new App ({
		port:8001,
		middlewares:[logger(),cors()],
		controllers:[new MessageRoute()]
})

app.listen();