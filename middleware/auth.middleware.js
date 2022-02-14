const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({message: 'Нет авторизации', head: req.headers})
    }

    const decoded = jwt.verify(token, config.get('jwtSecret')) //если проверка выдаст выдаст ошибку, выполнение прервется и вызовется catch

    req.user = decoded

    next()

  } catch (e) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}