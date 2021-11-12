const jwt = require('jsonwebtoken')

function authenthication (req, res, next) {
  try {
    const headers = req.headers.access_token
    const payload = jwt.verify(headers, process.env.JWT_SECRET_KEY)
    req.userData = payload
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(400).json({
        msg: err.message
      })
    } else {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }
}

module.exports = {
  authenthication
}
