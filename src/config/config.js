export const {
    SERVER_PORT = 3001,
    JWT_SECRET,
    COOKIE_SECRET,
    MONGO_USR,
    MONGO_PASS,
    MONGO_DB,
    MONGO_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PASS}@cluster0.jffmlhp.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`,
} = process.env;
