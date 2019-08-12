const Dev = require('../models/Dev')

const store = async (req, res) => {
  const { id } = req.params
  const { user } = req.headers

  const loggedDev = await Dev.findById(user)
  const targetDev = await Dev.findById(id)

  if (!targetDev) {
    return res.status(400).json({ error: 'Dev does not exists!' })
  }

  loggedDev.dislikes.push(targetDev._id)

  await loggedDev.save()

  return res.json(loggedDev)
}

module.exports = { store }
