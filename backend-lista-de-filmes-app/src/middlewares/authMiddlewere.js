const extractUserId = (req, res, next) => {
    let userId = req.header('X-User-ID');

    if (!userId) {
        return res.status(401).json({ message: 'Header X-User-ID obrigatório' });
    }

    req.userId = userId;
    next();
};

module.exports = extractUserId;