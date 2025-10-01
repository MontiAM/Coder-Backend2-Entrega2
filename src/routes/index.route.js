// Routes
import productsRoute from "./api/products.routes.js";
import cartRoute from "./api/cart.routes.js";
import userRouter from "./api/users.route.js";
import sessionRouter from "./api/sessions.route.js";
import smtpRouter from "./api/smtp.routes.js";

class IndexRoute {
    initRoutes(app) {
        app.use("/api/products", productsRoute);
        app.use("/api/cart", cartRoute);
        app.use("/api/users", userRouter);
        app.use("/api/sessions", sessionRouter);
        app.use("/api/smtp", smtpRouter);
    }
}

export default new IndexRoute();
