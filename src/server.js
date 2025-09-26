import express from "express";
import cookieParser from "cookie-parser";

// Mongo Config
import mongoDB from "./config/db/db-connection.js";

// Middlewares
import errorHandler from "./middlewares/error-handler.js";

// Config
import { SERVER_PORT, COOKIE_SECRET } from "./config/config.js";

// Routes
import indexRoute from "./routes/index.route.js";

// Passport
import passport from "passport";
import "./middlewares/passport/passport-jwt-cookies.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

// Inicializar middleware de Passport a nivel de aplicacion
app.use(passport.initialize());

app.use(errorHandler);

// Routes
indexRoute.initRoutes(app);

// DB Connection
await mongoDB.connect();

// SERVER
app.listen(SERVER_PORT, () => {
    console.log(`Server running http://localhost:${SERVER_PORT}`);
});
