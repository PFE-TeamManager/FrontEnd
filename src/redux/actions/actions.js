import {requests} from "../agent";
import {
  PROJECT_LIST_ERROR,PROJECT_LIST_RECEIVED,PROJECT_LIST_REQUEST,PROJECT_LIST_SET_PAGE,
  PROJECT_RECEIVED,PROJECT_REQUEST,PROJECT_UNLOAD,PROJECT_ADDED,
  PROJECT_ERROR, PROJECT_FORM_UNLOAD,


  USER_CONFIRMATION_SUCCESS,USER_LOGIN_SUCCESS,
  USER_LOGOUT,USER_PROFILE_ERROR,USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST,USER_REGISTER_COMPLETE,USER_REGISTER_SUCCESS,
  USER_SET_ID,

  
  COMMENT_ADDED,COMMENT_LIST_ERROR,COMMENT_LIST_RECEIVED,COMMENT_LIST_REQUEST,COMMENT_LIST_UNLOAD,

  TASK_ADDED,TASK_LIST_ERROR,TASK_LIST_RECEIVED,TASK_LIST_REQUEST,TASK_LIST_UNLOAD,TASK_UNLOAD,
  TASK_REQUEST,TASK_ERROR,TASK_RECEIVED,
  
  ALL_TASKS_LIST_SET_PAGE,ALL_TASKS_LIST_REQUEST,ALL_TASKS_LIST_ERROR,ALL_TASKS_LIST_RECEIVED,
  ALL_BUGS_LIST_SET_PAGE,ALL_BUGS_LIST_REQUEST,ALL_BUGS_LIST_ERROR,ALL_BUGS_LIST_RECEIVED,

  LABEL_LIST_REQUEST,LABEL_ADDED,LABEL_LIST_ERROR,LABEL_LIST_RECEIVED,

  SEARCH_TASK_REQUEST,SEARCH_TASK_ERROR,SEARCH_TASK_RECEIVED,

  MY_TASKS_LIST_ERROR,MY_TASKS_LIST_RECEIVED,MY_TASKS_LIST_REQUEST,
  MY_BUGS_LIST_ERROR,MY_BUGS_LIST_RECEIVED,MY_BUGS_LIST_REQUEST,

  TEAM_LIST_ERROR,TEAM_LIST_RECEIVED,TEAM_LIST_REQUEST,TEAM_LIST_SET_PAGE,
  TEAM_RECEIVED,TEAM_REQUEST,TEAM_UNLOAD,TEAM_ADDED,

  MEMBER_LIST_REQUEST,MEMBER_LIST_ERROR,MEMBER_LIST_RECEIVED,MEMBER_PATCHED,

  BUG_ADDED,BUG_UNLOAD,BUG_REQUEST,BUG_RECEIVED,BUG_ERROR,BUG_LIST_REQUEST,
  BUG_LIST_RECEIVED,BUG_LIST_ERROR,BUG_LIST_UNLOAD,

  DASHBOARD_COUNT_TASKS_PROJECTS_REQUEST,DASHBOARD_COUNT_TASKS_PROJECTS_ERROR,
  DASHBOARD_COUNT_TASKS_PROJECTS_RECEIVED,
  DASHBOARD_COUNT_BUGS_PROJECTS_ERROR,
  DASHBOARD_COUNT_BUGS_PROJECTS_RECEIVED,
  DASHBOARD_COUNT_BUGS_PROJECTS_REQUEST

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
        //console.log(error);
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

export const userPATCH = (content,userId) => {
  //return (dispatch) => {
    return requests.patch(`/users/${userId}`,{description: content});
  //}
}



export const searchTaskRequest = () => ({
  type: SEARCH_TASK_REQUEST,
});

export const searchTaskError = (error) => ({
  type: SEARCH_TASK_ERROR,
  error
});

export const searchTaskReceived = (data) => ({
  type: SEARCH_TASK_RECEIVED,
  data
});

export const searchTask = (searchparam) => {
  return (dispatch) => {
    dispatch(searchTaskRequest());
    return requests.get(`/tasks?TaskTitle=${searchparam}`)
      .then(response => dispatch(searchTaskReceived(response)))
      .catch(error => dispatch(searchTaskError(error)));
  }
}

/*****************END User Action****************/


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

export const commentListFetchTask = (id, page = 1) => {
  return (dispatch) => {
    dispatch(commentListRequest());
    return requests.get(`/tasks/${id}/comments?_page=${page}`)
      .then(response => dispatch(commentListReceived(response)))
      .catch(error => dispatch(commentListError(error)));
  }
};

export const commentListFetchBug = (id, page = 1) => {
  return (dispatch) => {
    dispatch(commentListRequest());
    return requests.get(`/bugs/${id}/comments?_page=${page}`)
      .then(response => dispatch(commentListReceived(response)))
      .catch(error => dispatch(commentListError(error)));
  }
};

export const commentAdded = (comment) => ({
  type: COMMENT_ADDED,
  comment
});

export const commentAddTask = (comment, taskId) => {
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
      //console.log(error);
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const commentAddBug = (comment, bugId) => {
  return (dispatch) => {
    return requests.post(
      '/comments',
      {
        content: comment,
        Bug: `/api/bugs/${bugId}`
      }
    ).then(
      response => dispatch(commentAdded(response))
    ).catch((error) => {
      //console.log(error);
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
//`/tasks?_page=${page}`
export const allTasksListFetch = (id,page = 1) => {
  return (dispatch) => {
    dispatch(allTaskListRequest());
    return requests.get(`/projects/${id}/tasks?_page=${page}`)
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

let dateTask = new Date();
export const affectDEVTotaskPATCH = (taskId,userId) => {
  return requests.patch(`/tasks/${taskId}`,
                        {
                          user: `/api/users/${userId}`,
                          ToDo: true,
                          ToDoDate: dateTask.toISOString()
                        });
}



export const taskEtatPATCH = (taskId,place) => {
  if( place == "board-to-do" ){
    return requests.patch(`/tasks/${taskId}`,
      {
        ToDo: true,
        doing: false,
        done: false,
        ToDoDate: dateTask.toISOString()
      });
  }

  if( place == "board-doing" ){
    return requests.patch(`/tasks/${taskId}`,
      {
        doing: true,
        ToDo: false,
        done: false,
        datedoing: dateTask.toISOString()
      });
  }

  if( place == "board-done" ){
    return requests.patch(`/tasks/${taskId}`,
      {
        done: true,
        doing: false,
        ToDo: false,
        datedone: dateTask.toISOString()
      });
  }
}

/*************End Task Action*****************/


/******************My Tasks Action**************/

export const myTasksListRequest = () => ({
  type: MY_TASKS_LIST_REQUEST,
});

export const myTasksListError = (error) => ({
  type: MY_TASKS_LIST_ERROR,
  error
});

export const myTasksListReceived = (data) => ({
  type: MY_TASKS_LIST_RECEIVED,
  data
});

export const myTasksListFetch = (id) => {
  return (dispatch) => {
    dispatch(myTasksListRequest());
    return requests.get(`/users/${id}/affected_tasks`)
      .then(response => dispatch(myTasksListReceived(response)))
      .catch(error => dispatch(myTasksListError(error)));
  }
};

/******************END My Tasks Action**************/


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

/*****************END Member Action****************/


/*********Bug Action**********/
export const bugListRequest = () => ({
  type: BUG_LIST_REQUEST,
});


export const bugListError = (error) => ({
  type: BUG_LIST_ERROR,
  error
});


export const bugListReceived = (data) => ({
  type: BUG_LIST_RECEIVED,
  data
});


export const bugListUnload = () => ({
  type: BUG_LIST_UNLOAD,
});


export const bugListFetch = (id, page = 1) => {
  return (dispatch) => {
    dispatch(bugListRequest());
    return requests.get(`/tasks/${id}/bugs?_page=${page}`)
      .then(response => dispatch(bugListReceived(response)))
      .catch(error => dispatch(bugListError(error)));
  }
};

export const bugAdded = (bug) => ({
  type: BUG_ADDED,
  bug
});

export const bugAdd = (bug, taskId, projectId) => {
  return (dispatch) => {
    return requests.post(
      '/bugs',
      {
        BugTitle: bug.BugTitle,
        BugDescription: bug.BugDescription,
        IdTask: `/api/tasks/${taskId}`,
        IdProject: `/api/projects/${projectId}`,
      }
    ).then(
      response => dispatch(bugAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const bugRequest = () => ({
  type: BUG_REQUEST,//Reducer To get the state
});

export const bugError = (error) => ({
  type: BUG_ERROR,
  error
});

export const bugReceived = (data) => ({
  type: BUG_RECEIVED,
  data
});

export const bugUnload = () => ({
  type: BUG_UNLOAD,
});

export const bugFetch = (id) => {
  return (dispatch) => {
    dispatch(bugRequest());//GET THE STATE BY REDUCER
    return requests.get(`/bugs/${id}`)
      .then(response => dispatch(bugReceived(response)))//Fill the state by the returned data
      .catch(error => dispatch(bugError(error)));
  }
};

export const bugPATCHActivity = (bugId,enabledstate) => {
  return requests.patch(`/bugs/${bugId}`,{enabled: enabledstate});
}

export const bugPATCH = (bugId,BugTitle) => {
  return requests.patch(`/bugs/${bugId}`,{BugTitle: BugTitle});
}


export const allBugListRequest = () => ({
  type: ALL_BUGS_LIST_REQUEST,
});

export const allBugListError = (error) => ({
  type: ALL_BUGS_LIST_ERROR,
  error
});

export const allBugListReceived = (data) => ({
  type: ALL_BUGS_LIST_RECEIVED,
  data
});

export const allBugsListSetPage = (page) => ({
  type: ALL_BUGS_LIST_SET_PAGE,
  page
});

export const allBugsListFetch = (id,page = 1) => {
  if(id){
    return (dispatch) => {
      dispatch(allBugListRequest());
      return requests.get(`/projects/${id}/bugs?_page=${page}`)
        .then(response => dispatch(allBugListReceived(response)))
        .catch(error => dispatch(allBugListError(error)));
    }
  } else {
    return (dispatch) => {
      dispatch(allBugListRequest());
      return requests.get(`/bugs?_page=${page}`)
        .then(response => dispatch(allBugListReceived(response)))
        .catch(error => dispatch(allBugListError(error)));
    }
  }

};



export const allBugsListNotifFetch = (id) => {
  if(id){
    return (dispatch) => {
      dispatch(allBugListRequest());
      return requests.get(`/projects/${id}/bugs`)
        .then(response => dispatch(allBugListReceived(response)))
        .catch(error => dispatch(allBugListError(error)));
    }
  } else {
    return (dispatch) => {
      dispatch(allBugListRequest());
      return requests.get(`/bugs`)
        .then(response => dispatch(allBugListReceived(response)))
        .catch(error => dispatch(allBugListError(error)));
    }
  }

};

let dateBug = new Date();
export const affectDEVTobugPATCH = (bugId,userId) => {
  return requests.patch(`/bugs/${bugId}`,
                        {
                          user: `/api/users/${userId}`,
                          ToDo: true,
                          ToDoDate: dateBug.toISOString()
                        });
}

export const bugEtatPATCH = (bugId,place) => {
  if( place == "board-to-do" ){
    return requests.patch(`/bugs/${bugId}`,
      {
        ToDo: true,
        doing: false,
        done: false,
        ToDoDate: dateBug.toISOString()
      });
  }

  if( place == "board-doing" ){
    return requests.patch(`/bugs/${bugId}`,
      {
        doing: true,
        ToDo: false,
        done: false,
        datedoing: dateBug.toISOString()
      });
  }

  if( place == "board-done" ){
    return requests.patch(`/bugs/${bugId}`,
      {
        done: true,
        doing: false,
        ToDo: false,
        datedone: dateBug.toISOString()
      });
  }
}

/*************End Bug Action*****************/

/******************My Bugs Action**************/

export const myBugsListRequest = () => ({
  type: MY_BUGS_LIST_REQUEST,
});

export const myBugsListError = (error) => ({
  type: MY_BUGS_LIST_ERROR,
  error
});

export const myBugsListReceived = (data) => ({
  type: MY_BUGS_LIST_RECEIVED,
  data
});

export const myBugsListFetch = (id) => {
  return (dispatch) => {
    dispatch(myBugsListRequest());
    return requests.get(`/users/${id}/affected_bugs`)
      .then(response => dispatch(myBugsListReceived(response)))
      .catch(error => dispatch(myBugsListError(error)));
  }
};

/******************END My Bugs Action**************/




/**************Dashboard Action**************/

export const dashboardCountTasksByProjectRequest = () => ({
  type: DASHBOARD_COUNT_TASKS_PROJECTS_REQUEST,
});

export const dashboardCountTasksByProjectError = (error) => ({
  type: DASHBOARD_COUNT_TASKS_PROJECTS_ERROR,
  error
});

export const dashboardCountTasksByProjectReceived = (data) => ({
  type: DASHBOARD_COUNT_TASKS_PROJECTS_RECEIVED,
  data
});

export const dashboardCountTasksByProject = () => {
  return (dispatch) => {
    dispatch(dashboardCountTasksByProjectRequest());
    return requests.get(`/dashboard/projects/tasks`)
      .then(response => dispatch(dashboardCountTasksByProjectReceived(response)))
      .catch(error => dispatch(dashboardCountTasksByProjectError(error)));
  }
};


export const dashboardCountBugsByProjectRequest = () => ({
  type: DASHBOARD_COUNT_BUGS_PROJECTS_REQUEST,
});

export const dashboardCountBugsByProjectError = (error) => ({
  type: DASHBOARD_COUNT_BUGS_PROJECTS_ERROR,
  error
});

export const dashboardCountBugsByProjectReceived = (data) => ({
  type: DASHBOARD_COUNT_BUGS_PROJECTS_RECEIVED,
  data
});

export const dashboardCountBugsByProject = () => {
  return (dispatch) => {
    dispatch(dashboardCountBugsByProjectRequest());
    return requests.get(`/dashboard/projects/bugs`)
      .then(response => dispatch(dashboardCountBugsByProjectReceived(response)))
      .catch(error => dispatch(dashboardCountBugsByProjectError(error)));
  }
};
/**************END Dashboard Action**************/