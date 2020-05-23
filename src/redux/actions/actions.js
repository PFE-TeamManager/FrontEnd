import {requests} from "../agent";
import {
  PROJECT_ERROR, PROJECT_FORM_UNLOAD,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_RECEIVED,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SET_PAGE,
  PROJECT_RECEIVED,
  PROJECT_REQUEST,
  PROJECT_UNLOAD,
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
import {parseApiErrors} from "../apiUtils";

export const projectListRequest = () => ({
  type: PROJECT_LIST_REQUEST,
});

export const projectListError = (error) => ({
  type: PROJECT_LIST_ERROR,
  error
});

export const projectListReceived = (data) => ({
  type: PROJECT_LIST_RECEIVED,
  data
});

export const projectListSetPage = (page) => ({
  type: PROJECT_LIST_SET_PAGE,
  page
});

// Keep it here in case i do the pagination in some entity
// export const projectListFetch = (page = 1) => {
//   return (dispatch) => {
//     dispatch(projectListRequest());
//     return requests.get(`/projects?_page=${page}`)
//       .then(response => dispatch(projectListReceived(response)))
//       .catch(error => dispatch(projectListError(error)));
//   }
// };

export const projectRequest = () => ({
  type: PROJECT_REQUEST,
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
    dispatch(projectRequest());
    return requests.get(`/projects/${id}`)
      .then(response => dispatch(projectReceived(response)))
      .catch(error => dispatch(projectError(error)));
  }
};

export const projectAdd = (title, content, images = []) => {
  return (dispatch) => {
    return requests.post(
      '/projects',
      {
        projectName,
        // content,
        // slug: title && title.replace(/ /g, "-").toLowerCase(),
        // images: images.map(image => `/api/images/${image.id}`)
      }
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      } else if (403 === error.response.status) {
        throw new SubmissionError({
          _error: 'You do not have rights to publish blog posts!'
        });
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const projectFormUnload = () => ({
  type: PROJECT_FORM_UNLOAD
});

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
        throw new SubmissionError(parseApiErrors(error));
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
