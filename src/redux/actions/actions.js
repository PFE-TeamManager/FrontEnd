import {requests} from "../agent";
import {
  PROJECT_ERROR, PROJECT_FORM_UNLOAD,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_RECEIVED,
  PROJECT_LIST_REQUEST,
  PROJECT_RECEIVED,
  PROJECT_REQUEST,
  PROJECT_UNLOAD,PROJECT_ADDED,
  IMAGE_DELETE_REQUEST, IMAGE_DELETED,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED,
  USER_CONFIRMATION_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_ERROR,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST,
  USER_REGISTER_COMPLETE,
  USER_REGISTER_SUCCESS,
  USER_SET_ID
} from "./constants";
import {SubmissionError} from "redux-form";
//import {parseApiErrors} from "../apiUtils";



/*****************Project Action****************/

export const projectListRequest = () => ({
  type: PROJECT_LIST_REQUEST,//reducer
});

export const projectListError = (error) => ({
  type: PROJECT_LIST_ERROR,
  error
});

export const projectListReceived = (data) => ({
  type: PROJECT_LIST_RECEIVED,//reducer
  data
});

export const projectListFetch = () => {
  return (dispatch) => {
    dispatch(projectListRequest());
    return requests.get(`/projects`)
      .then(response => dispatch(projectListReceived(response)))
      .catch(error => dispatch(projectListError(error)));
  }
};

export const projectRequest = () => ({
  type: PROJECT_REQUEST,//Reducer To get the state
});

export const projectError = (error) => ({
  type: PROJECT_ERROR,
  error
});

export const projectReceived = (data) => ({
  type: PROJECT_RECEIVED,
  data
});

export const projectUnload = () => ({
  type: PROJECT_UNLOAD,
});

export const projectFetch = (id) => {
  return (dispatch) => {
    dispatch(projectRequest());//GET THE STATE BY REDUCER
    return requests.get(`/projects/${id}`)
      .then(response => dispatch(projectReceived(response)))//Fill the state by the returned data
      .catch(error => dispatch(projectError(error)));
  }
};

export const projectAdded = (project) => ({
  type: PROJECT_ADDED,
  project
});

export const projectAdd = (projectName) => {
  return (dispatch) => {
    return requests.post(
      '/projects',
      {
        projectName: projectName
      }
    ).then(
      response => dispatch(projectAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      //throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const projectFormUnload = () => ({
  type: PROJECT_FORM_UNLOAD
});

/*****************END Project Action****************/



/*****************User Action****************/
export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId
  }
};

export const userLoginAttempt = (username, password) => {
  return (dispatch) => {
    return requests.post('/login_check', {username, password}, false).then(
      response => dispatch(userLoginSuccess(response.token, response.id))
    ).catch(() => {
      throw new SubmissionError({
        _error: 'Username or password is invalid'
      })
    });
  }
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
};

export const userRegisterSuccess = () => {
  return {
    type: USER_REGISTER_SUCCESS
  }
};

// retypedPassword will be checked in the front no need to send it to the back
export const userRegister = (username, password, email, phone) => {
  return (dispatch) => {
    return requests.post('/users', {username, password, email, phone}, false)
      .then(() => dispatch(userRegisterSuccess()))
      .catch(error => {
        //throw new SubmissionError(parseApiErrors(error));
      });
  }
};

export const userConfirmationSuccess = () => {
  return {
    type: USER_CONFIRMATION_SUCCESS
  }
};

export const userRegisterComplete = () => {
  return {
    type: USER_REGISTER_COMPLETE
  }
};

export const userConfirm = (confirmationToken) => {
  return (dispatch) => {
    return requests.post('/users/confirm', {confirmationToken}, false)
      .then(() => dispatch(userConfirmationSuccess()))
      .catch(error => {
        throw new SubmissionError({
          _error: 'Confirmation token is invalid'
        });
      });
  }
};

export const userSetId = (userId) => {
  return {
    type: USER_SET_ID,
    userId
  }
};

export const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST
  }
};

export const userProfileError = (userId) => {
  return {
    type: USER_PROFILE_ERROR,
    userId
  }
};

export const userProfileReceived = (userId, userData) => {
  return {
    type: USER_PROFILE_RECEIVED,
    userData,
    userId
  }
};

export const userProfileFetch = (userId) => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    return requests.get(`/users/${userId}`, true).then(
      response => dispatch(userProfileReceived(userId, response))
    ).catch(() => dispatch(userProfileError(userId)))
  }
};
/*****************END User Action****************/




/*****************Image Action****************/
export const imageUploaded = (data) => {
  return {
    type: IMAGE_UPLOADED,
    image: data
  }
};

export const imageUploadRequest = () => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
  }
};

export const imageUploadError = () => {
  return {
    type: IMAGE_UPLOAD_ERROR,
  }
};

export const imageUpload = (file) => {
  return (dispatch) => {
    dispatch(imageUploadRequest());
    return requests.upload('/images', file)
      .then(response => dispatch(imageUploaded(response)))
      .catch(() => dispatch(imageUploadError))
  }
};

export const imageDeleteRequest = () => {
  return {
    type: IMAGE_DELETE_REQUEST,
  }
};

export const imageDelete = (id) => {
  return (dispatch) => {
    dispatch(imageDeleteRequest());
    return requests.delete(`/images/${id}`)
      .then(() => dispatch(imageDeleted(id)));
  }
};

export const imageDeleted = (id) => {
  return {
    type: IMAGE_DELETED,
    imageId: id
  }
};
/*****************END Image Action****************/