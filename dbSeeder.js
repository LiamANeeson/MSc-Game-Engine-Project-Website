const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./Data/User')
const questions = require('./Data/Question')
const User = require('./models/userModel')
const Answer = require('./models/answerModel')
const Question = require('./models/questionModel')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Answer.deleteMany()
    await Question.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]

    const sampleQuestions = questions.map((question) => {
      return { ...question, userObj: adminUser }
    })

    await Question.insertMany(sampleQuestions)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Answer.deleteMany()
    await Question.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}