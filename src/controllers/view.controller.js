class ViewsController {
    index(req, res) {
        res.render("index");
    }
    login(req, res) {
        res.render("login");
    }
    register(req, res) {
        res.render("register");
    }
}

export const viewsController = new ViewsController();
