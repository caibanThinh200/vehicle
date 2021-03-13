require('dotenv').config()
const knex = require('knex')
const querry = knex({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      
    },
    pool:{min:0,max:100}
  });
module.exports = querry;