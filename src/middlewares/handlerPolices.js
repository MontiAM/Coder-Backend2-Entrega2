export const handlePolicies =
    (allowedRoles = []) =>
    (req, res, next) => {
        const normalizedRoles = allowedRoles.map((r) => r.toLowerCase());
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const userRole = req.user.role;
        if (!userRole) return res.status(403).json({ message: "Forbidden" });

        if (userRole.toLowerCase() === "admin") return next();

        if (!normalizedRoles.includes(userRole.toLowerCase()))
            return res.status(403).json({ message: "Forbidden" });
        next();
    };
