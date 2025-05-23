module.exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({message: 'สำหรับผู้ดูแลระบบเท่านั้น'});
    }
}