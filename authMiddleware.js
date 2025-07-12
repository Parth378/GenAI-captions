// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }
// };

// module.exports = protect;


// Backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // Used to verify tokens
const User = require('../models/User'); // Your Mongoose User model to find the user by ID

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract the token from the header
      // It will look like "Bearer TOKEN_STRING", so we split by space and take the second part
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token
      // jwt.verify takes the token and your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user associated with the token
      // decoded.id typically comes from the payload you used when generating the token (e.g., generateToken(user._id))
      // .select('-password') ensures the password hash is not returned
      req.user = await User.findById(decoded.id).select('-password');

      // 5. If successful, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // 6. Handle token verification errors
      console.error('Token verification error:', error.message); // Log the actual error for debugging
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 7. If no token was found in the header at all
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = protect;