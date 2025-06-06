const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
   const token = req.headers.authorization || "";


   try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedData) {
         return res.json({
            message: 'Invalid Token',
         })
      }
      req.userId = decodedData.id;
      next();

   } catch (error) {
      res.status(500).json({
         error: error.message,
         message: 'Something went wrong in validating the TOKEN'
      })
   }
}

module.exports = userMiddleware;