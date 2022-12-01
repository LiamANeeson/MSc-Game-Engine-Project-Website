import * as axios from "axios";

const apiURL = "/api";

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
        password: password,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//Reset Password
export async function resetPass(oldPassword, newPassword, userId) {
  try {
    const axiosConfig = {
      method: "put",
      url: `http://localhost:5000/api/users/reset-password/${userId}`,
      data: {
        oldpassword: oldPassword,
        newpassword: newPassword,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get user
export async function getUser() {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/users`,
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
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "post",
      url: `${apiURL}/question`,
      headers: { Authorization: "Bearer " + token },
      data: {
        name: title,
        description: description,
        tags: tags.split(","),
      },
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
export async function getQuestions(authToken, page, sort, sortOrder, search) {
  try {
    const token = authToken;
    let URL;
    if (search === "") {
      URL = `${apiURL}/question?page=${page}&sort=${sort},${sortOrder}`;
    } else {
      URL = `${apiURL}/question?page=${page}&sort=${sort},${sortOrder}&search=${search}`;
    }
    const axiosConfig = {
      method: "get",
      url: URL,
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
    let token = localStorage.getItem("authToken");
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

//Get the questions which have been saved by the user
export async function getUserSavedQuestions() {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "get",
      url: `${apiURL}/question/saved-posts`,
      headers: { Authorization: "Bearer " + token }
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//update question

//delete question
export async function deleteQuestion(questionID) {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "delete",
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

// Save question
export async function saveQuestion(questionID) {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "patch",
      url: `${apiURL}/question/${questionID}/save`,
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

//vote question
export async function voteQuestion(questionID) {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "patch",
      url: `${apiURL}/question/${questionID}/vote`,
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

// Down vote question
export async function downVoteQuestion(questionID) {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "patch",
      url: `${apiURL}/question/${questionID}/down_vote`,
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

//get answer
export async function getAnswer(answerID) {
  try {
    let token = localStorage.getItem("authToken");
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

//post a answer
export async function createAnswer(questionId, content) {
  try {
    let token = localStorage.getItem("authToken");
    const axiosConfig = {
      method: "post",
      url: `${apiURL}/answer`,
      headers: { Authorization: "Bearer " + token },
      data: {
        questionId: questionId,
        content: content,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
