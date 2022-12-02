const shortId = require('short-uuid')()

module.exports = {
  generateId: () => shortId.new()
}
