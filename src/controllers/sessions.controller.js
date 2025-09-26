class SessionController {
    current = (req, res) => res.json({ user: req.user });
}

export const sessionController = new SessionController();
