const jwt = require('jsonwebtoken'); // Corrected the import
const User = require('../models/user.model');
const expressAsyncHandler = require('express-async-handler');

const protectedRoute = expressAsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ msg: 'No token, authorization denied' });
        }
        
        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(403).json({ msg: 'Invalid token, authorization denied' });
        }
        // console.log(decode);
        const user = await User.findById(decode.userID).select('-password')
        // console.log(user);
        if (!user) {
            return res.status(403).json({ msg: 'User not found, authorization denied' });
        }
        req.user = user;
        next();
    } catch (error) {
        // console.log('Error in protected route', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = protectedRoute;
