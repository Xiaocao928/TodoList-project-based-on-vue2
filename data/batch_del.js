const fs = require('fs')
const path = require('path')

module.exports = async (req, res, next) => {
  // DELETE /todos?complete=true
  // req.method 请求方式
  if (req.method == 'DELETE') {
    // 从url的queryString中提取completed的值
    const { completed } = req.query

    // console.log(completed)
    if (completed) {
      const file = path.join(__dirname, 'data.json')
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
      const filter = data.todos.filter(
        item => item.completed != (completed == 'true' ? true : false)
      )
      // console.log(filter)
      const write = JSON.stringify({
        todos: filter,
      })

      fs.writeFileSync(file, write, 'utf-8')
      res.status(204).send({})
      return
    }
  }

  next()
}
