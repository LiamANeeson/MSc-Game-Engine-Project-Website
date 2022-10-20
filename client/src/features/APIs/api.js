import * as axios from "axios";

const apiURL = "http://localhost:5000/api";

function normalizeServerResponse(serverResponse) {
  let response = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}

function normalizeServerError(serverResponse) {
  let response = {
    data: serverResponse.message,
    status: serverResponse.status,
  };

  return response;
}

//Login
export async function login(email, password) {
  try {
    const axiosConfig = {
      method: "post",
      url: `${apiURL}/users/login`,
      data: {
        email: email,
        password: password
      }
    };
      const response = await axios.default.request(axiosConfig);

      if (response.data) {
          localStorage.setItem('userName', JSON.stringify(response.data.name))
          localStorage.setItem('profile', JSON.stringify(response.data.profile))
      }
      
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get user
export async function getUser(ID) {
  try {
    let token = localStorage.getItem("AuthToken");
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/users/${ID}`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
//Create a question
export async function createQuestion(title, description, tags) {
  try {
    let token = localStorage.getItem("AuthToken");
    const axiosConfig = {
      method: "post",
      url: `${apiURL}/question`,
      headers: { Authorization: "Bearer " + token },
      data: {
        title: title,
        description: description,
        tags: tags.split(',')
      }
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get all question
export async function getQuestions(authToken) {
  try {
    const token = authToken;
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/question`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get a question
export async function getQuestion(questionID) {
  try {
    let token = localStorage.getItem("AuthToken");
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/question/${questionID}`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//post a answer
export async function createAnswer(questionId,content) {
  try {
    let token = localStorage.getItem("AuthToken");
    const axiosConfig = {
      method: "post",
      url: `${apiURL}/answer`,
      headers: { Authorization: "Bearer " + token },
      data:{
        questionId:questionId,
        content:content
      }
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get answer
export async function getAnswer(answerID) {
  try {
    let token = localStorage.getItem("AuthToken");
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/answer/${answerID}`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
