const User = require('./userModel')
const Session = require('./sessionModel')

User.hasMany(Session, {
  foreignKey: 'userId',
})

Session.belongsTo(User, {
  foreignKey: 'userId',
})

module.exports = { User, Session }
