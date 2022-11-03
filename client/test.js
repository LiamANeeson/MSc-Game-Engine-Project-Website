var assert = require("assert");
const request = require("supertest");
const { expect } = require("chai");
const dotenv = require("dotenv").config();
const app = require("./backend/server");
const Question = require("./backend/models/questionModel");
const User = require("./backend/models/userModel");
const mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

const tempUser = {
  name: process.env.USER_NAME,
  email: process.env.USER_TEST_MAIL,
  password: process.env.USER_TEST_PASSWORD,
};

const tempQuestion = {
  _id: process.env.TEST_QUESTION_ID,
  name: "How do I use axios.get to get user data from Postgresql if the user data is already in it?",
  description:
    "I am using auth0 to sign up a user. Upon logging in, the react app will automatically obtain the user information and axios.post to the backend. It will store the id in userId and information in",
  tags: ["javascript", "postgresql", "reactjs"],
};

const loginUser = {
  email: process.env.USER_TEST_MAIL,
  password: process.env.USER_TEST_PASSWORD,
};

const token = process.env.USER_TEST_TOKEN;

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

//Connect Database
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", async function () {
//   console.log("Connected successfully");
// });

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();
//   for (let connection of collections) {
//     await connection.deleteMany({});
//   }
// });

describe(" Dashboard APIs Test ", () => {
  // Register User
  it("POST should register new user with valid credentials", (done) => {
    request(app)
      .post("/api/users")
      .send(tempUser)
      .expect(201)
      .then((res) => {
        expect(res.body.email).to.be.eql(process.env.USER_TEST_MAIL);
        done();
      })
      .catch((err) => done(err));
  });

  //check user with same email id
  it("POST shouldn't accept the email that already exists in the database", (done) => {
    request(app)
      .post("/api/users")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.be.eql("User already exists");
        done();
      })
      .catch((err) => done(err));
  });

  //Login USer
  it("POST should login user with valid credentials", (done) => {
    request(app)
      .post("/api/users/login")
      .send(loginUser)
      .expect(200)
      .then((res) => {
        expect(res.body.email).to.be.eql(process.env.USER_TEST_MAIL);
        done();
      })
      .catch((err) => done(err));
  });

  //Get User
  it("GET It should return logged in user", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/users")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        expect(response).to.have.status(200);
        // response.body.should.be.a("object");
        done();
      });
  });

  //Fetch all the questions
  it("GET It should return all the Questions", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/question")
      //.set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        expect(response).to.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });

  //NOT return all the Questions
  it("GET It should NOT return all the Questions", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/question")
      .end((err, response) => {
        should.exist(response.body);
        done();
      });
  });

  //Create question
  it("POST It should create a new Question", (done) => {
    chai
      .request("http://localhost:5000")
      .post("/api/question")
      .send(tempQuestion)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });

  //Get Question By ID
  it("It should GET a task by ID", (done) => {
    const questionID = process.env.TEST_QUESTION_ID;
    chai
      .request("http://localhost:5000")
      .get("/api/question/" + questionID)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("_id");
        response.body.should.have.property("name");
        response.body.should.have.property("_id").eq(questionID);
        done();
      });
  });
});
