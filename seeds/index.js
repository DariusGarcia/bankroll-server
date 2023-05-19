const seedUsers = require('./userSeed')

const sequelize = require('../config/connection')

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')

  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n')

  console.log('\n-----  SUCCESS: SEED ENDED  -----\n')

  process.exit(0)
}

seedAll()
