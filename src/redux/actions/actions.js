import {requests} from "../agent";
import {
  PROJECT_LIST_ERROR,PROJECT_LIST_RECEIVED,PROJECT_LIST_REQUEST,PROJECT_LIST_SET_PAGE,
  PROJECT_RECEIVED,PROJECT_REQUEST,PROJECT_UNLOAD,PROJECT_ADDED,
  PROJECT_ERROR, PROJECT_FORM_UNLOAD,


  IMAGE_DELETE_REQUEST, IMAGE_DELETED,
  IMAGE_UPLOAD_ERROR,IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED,


  USER_CONFIRMATION_SUCCESS,USER_LOGIN_SUCCESS,
  USER_LOGOUT,USER_PROFILE_ERROR,USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST,USER_REGISTER_COMPLETE,USER_REGISTER_SUCCESS,
  USER_SET_ID,

  
  COMMENT_ADDED,COMMENT_LIST_ERROR,COMMENT_LIST_RECEIVED,COMMENT_LIST_REQUEST,COMMENT_LIST_UNLOAD,

  TASK_ADDED,TASK_LIST_ERROR,TASK_LIST_RECEIVED,TASK_LIST_REQUEST,TASK_LIST_UNLOAD,TASK_UNLOAD,
  TASK_REQUEST,TASK_ERROR,TASK_RECEIVED,
  
  ALL_TASKS_LIST_SET_PAGE,ALL_TASKS_LIST_REQUEST,ALL_TASKS_LIST_ERROR,ALL_TASKS_LIST_RECEIVED,

  LABEL_LIST_REQUEST,LABEL_ADDED,LABEL_LIST_ERROR,LABEL_LIST_RECEIVED,

  TEAM_LIST_ERROR,TEAM_LIST_RECEIVED,TEAM_LIST_REQUEST,TEAM_LIST_SET_PAGE,
  TEAM_RECEIVED,TEAM_REQUEST,TEAM_UNLOAD,TEAM_ADDED,

  MEMBER_LIST_REQUEST,MEMBER_LIST_ERROR,MEMBER_LIST_RECEIVED,MEMBER_PATCHED
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../../redux/apiUtils";


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

  export const projectListSetPage = (page) => ({
    type: PROJECT_LIST_SET_PAGE,
    page
  });

  export const projectListFetch = (page = 1) => {
    return (dispatch) => {
      dispatch(projectListRequest());
      return requests.get(`/projects?_page=${page}`)
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

  export const projectAdd = (projectName,teamId) => {
    return (dispatch) => {
      return requests.post(
        '/projects',
        {
          projectName: projectName,
          Teams: [
            `/api/teams/${teamId}`
          ]
        }
      ).then(
        response => dispatch(projectAdded(response))
      ).catch((error) => {
        if (401 === error.response.status) {
          return dispatch(userLogout());//Token Expired
        }
        throw new SubmissionError(parseApiErrors(error));
      })
    }
  };

  export const projectFormUnload = () => ({
    type: PROJECT_FORM_UNLOAD
  });

  export const projectPATCHActivity = (projectId,enabledstate) => {
    return requests.patch(`/projects/${projectId}`,{enabled: enabledstate});
  }

  export const projectPATCH = (projectId,projectName) => {
    return requests.patch(`/projects/${projectId}`,{projectName: projectName});
  }

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
export const userRegister = (username, email, password) => {
  return (dispatch) => {
    return requests.post('/users', {username, email, password}, false)
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
        //parseApiErrors is in apiUtils
        throw new SubmissionError(
          parseApiErrors(error)
        );
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



/*********Comment Action**********/
export const commentListRequest = () => ({
  type: COMMENT_LIST_REQUEST,
});

export const commentListError = (error) => ({
  type: COMMENT_LIST_ERROR,
  error
});

export const commentListReceived = (data) => ({
  type: COMMENT_LIST_RECEIVED,
  data
});

export const commentListUnload = () => ({
  type: COMMENT_LIST_UNLOAD,
});

export const commentListFetch = (id, page = 1) => {
  return (dispatch) => {
    dispatch(commentListRequest());
    return requests.get(`/tasks/${id}/comments?_page=${page}`)
      .then(response => dispatch(commentListReceived(response)))
      .catch(error => dispatch(commentListError(error)));
  }
};

export const commentAdded = (comment) => ({
  type: COMMENT_ADDED,
  comment
});

export const commentAdd = (comment, taskId) => {
  return (dispatch) => {
    return requests.post(
      '/comments',
      {
        content: comment,
        Task: `/api/tasks/${taskId}`
      }
    ).then(
      response => dispatch(commentAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};
/*************End Comment Action*****************/



/*********Task Action**********/
export const taskListRequest = () => ({
  type: TASK_LIST_REQUEST,
});

export const allTaskListRequest = () => ({
  type: ALL_TASKS_LIST_REQUEST,
});

export const taskListError = (error) => ({
  type: TASK_LIST_ERROR,
  error
});

export const allTaskListError = (error) => ({
  type: ALL_TASKS_LIST_ERROR,
  error
});

export const taskListReceived = (data) => ({
  type: TASK_LIST_RECEIVED,
  data
});

export const allTaskListReceived = (data) => ({
  type: ALL_TASKS_LIST_RECEIVED,
  data
});

export const taskListUnload = () => ({
  type: TASK_LIST_UNLOAD,
});

export const allTasksListSetPage = (page) => ({
  type: ALL_TASKS_LIST_SET_PAGE,
  page
});

export const taskListFetch = (id, page = 1) => {
  return (dispatch) => {
    dispatch(taskListRequest());
    return requests.get(`/projects/${id}/tasks?_page=${page}`)
      .then(response => dispatch(taskListReceived(response)))
      .catch(error => dispatch(taskListError(error)));
  }
};

export const allTasksListFetch = (page = 1) => {
  return (dispatch) => {
    dispatch(allTaskListRequest());
    return requests.get(`/tasks?_page=${page}`)
      .then(response => dispatch(allTaskListReceived(response)))
      .catch(error => dispatch(allTaskListError(error)));
  }
};

export const labelListRequest = () => ({
  type: LABEL_LIST_REQUEST,
});

export const labelListError = (error) => ({
  type: LABEL_LIST_ERROR,
  error
});

export const labelListReceived = (data) => ({
  type: LABEL_LIST_RECEIVED,
  data
});

export const labelListFetch = () => {
  return (dispatch) => {
    dispatch(labelListRequest());
    return requests.get(`/labels`)
      .then(response => dispatch(labelListReceived(response)))
      .catch(error => dispatch(labelListError(error)));
  }
};

export const taskAdded = (task) => ({
  type: TASK_ADDED,
  task
});

export const taskAdd = (task, projectId, labels) => {
  return (dispatch) => {
    return requests.post(
      '/tasks',
      {
        TaskTitle: task.TaskTitle,
        TaskDescription: task.TaskDescription,
        IdProject: `/api/projects/${projectId}`,
        labels:labels
      }
    ).then(
      response => dispatch(taskAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};



export const labelAdded = (label) => ({
  type: LABEL_ADDED,
  label
});

export const labelAdd = (label,color) => {

  return (dispatch) => {
    return requests.post(
      '/labels',
      {
        labelName: label.LabelName,
        color: "#"+color
      }
    ).then(
      response => dispatch(labelAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const taskRequest = () => ({
  type: TASK_REQUEST,//Reducer To get the state
});

export const taskError = (error) => ({
  type: TASK_ERROR,
  error
});

export const taskReceived = (data) => ({
  type: TASK_RECEIVED,
  data
});

export const taskUnload = () => ({
  type: TASK_UNLOAD,
});

export const taskFetch = (id) => {
  return (dispatch) => {
    dispatch(taskRequest());//GET THE STATE BY REDUCER
    return requests.get(`/tasks/${id}`)
      .then(response => dispatch(taskReceived(response)))//Fill the state by the returned data
      .catch(error => dispatch(taskError(error)));
  }
};

export const taskPATCHActivity = (taskId,enabledstate) => {
  return requests.patch(`/tasks/${taskId}`,{enabled: enabledstate});
}

export const taskPATCH = (taskId,TaskTitle) => {
  return requests.patch(`/tasks/${taskId}`,{TaskTitle: TaskTitle});
}

/*************End Task Action*****************/


/*****************Team Action****************/

export const teamListRequest = () => ({
  type: TEAM_LIST_REQUEST,//reducer
});

export const teamListError = (error) => ({
  type: TEAM_LIST_ERROR,
  error
});

export const teamListReceived = (data) => ({
  type: TEAM_LIST_RECEIVED,//reducer
  data
});

export const teamListSetPage = (page) => ({
  type: TEAM_LIST_SET_PAGE,
  page
});

export const teamListFetch = () => {
  return (dispatch) => {
    dispatch(teamListRequest());
    return requests.get(`/teamsdatatable`)
      .then(response => dispatch(teamListReceived(response)))
      .catch(error => dispatch(teamListError(error)));
  }
};

export const teamRequest = () => ({
  type: TEAM_REQUEST,//Reducer To get the state
});

// export const teamError = (error) => ({
//   type: TEAM_ERROR,
//   error
// });

export const teamReceived = (data) => ({
  type: TEAM_RECEIVED,
  data
});

export const teamUnload = () => ({
  type: TEAM_UNLOAD,
});

export const teamFetch = (id) => {
  return (dispatch) => {
    dispatch(teamRequest());//GET THE STATE BY REDUCER
    return requests.get(`/teams/${id}`)
      .then(response => dispatch(teamReceived(response)));//Fill the state by the returned data
      //.catch(error => dispatch(teamError(error)));
  }
};

export const teamAdded = (team) => ({
  type: TEAM_ADDED,
  team
});

export const teamAdd = (teamName) => {
  return requests.post('/teams',{teamName: teamName});
};

// export const teamFormUnload = () => ({
//   type: TEAM_FORM_UNLOAD
// });

/*****************END Team Action****************/


/*********Member Action*******/

export const memberListRequest = () => ({
  type: MEMBER_LIST_REQUEST,//reducer
});

export const memberListError = (error) => ({
  type: MEMBER_LIST_ERROR,
  error
});

export const memberListReceived = (data) => ({
  type: MEMBER_LIST_RECEIVED,//reducer
  data
});

export const memberPatched = (member) => ({
  type: MEMBER_PATCHED,
  member
});

export const memberListFetch = () => {
  return (dispatch) => {
    dispatch(memberListRequest());
    return requests.get(`/usersdatatable`)
      .then(response => dispatch(memberListReceived(response)))
      .catch(error => dispatch(memberListError(error)));
  }
};

//memberPatched , dispatch logic not working
export const memberPATCH = (role1, role2, memberId) => {
  return requests.patch(`/users/${memberId}`,{roles: [role1,role2]});
};

export const memberTeamPATCH = (memberId,teamId) => {
  return requests.patch(`/users/${memberId}`,{ teams: `/api/teams/${teamId}` });
};

export const teamPATCHActivity = (teamId,enabledstate) => {
  return requests.patch(`/teams/${teamId}`,{enabled: enabledstate});
}

export const teamPATCH = (teamId,teamName) => {
  return requests.patch(`/teams/${teamId}`,{teamName: teamName});
}

// export const taskAdd = (task, projectId) => {
//   return (dispatch) => {
//     return requests.post(
//       '/tasks',
//       {
//         TaskTitle: task.TaskTitle,
//         TaskDescription: task.TaskDescription,
//         IdProject: `/api/projects/${projectId}`
//       }
//     ).then(
//       response => dispatch(taskAdded(response))
//     ).catch((error) => {
//       if (401 === error.response.status) {
//         return dispatch(userLogout());
//       }
//       throw new SubmissionError(parseApiErrors(error));
//     })
//   }
// };

/*****************END Member Action****************/