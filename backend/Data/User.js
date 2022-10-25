const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Prajakta Kulkarni',
    email: 'prajakta@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Tejas Dusane',
    email: 'tejas@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Bozhidar Velikov',
    email: 'bozi@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Liam Neeson',
    email: 'liam@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Minghui Gao ',
    email: 'minghui@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alex Mulkerrins',
    email: 'alex@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users;