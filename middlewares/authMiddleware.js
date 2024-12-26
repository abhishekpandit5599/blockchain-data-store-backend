module.exports = (req, res, next) => {
    const { userType } = req.body;
    if (userType !== "user" && userType !== "admin") {
        return res.status(403).json({ error: "Unauthorized user type." });
    }
    next();
};
