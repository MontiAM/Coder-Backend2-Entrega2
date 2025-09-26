import MongoStore from "connect-mongo";
import { COOKIE_SECRET, MONGO_URI } from "../config.js";

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 60,
        crypto: {
            secret: COOKIE_SECRET,
        },
    }),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60,
        httpOnly: true,
    },
};

export default sessionConfig;
