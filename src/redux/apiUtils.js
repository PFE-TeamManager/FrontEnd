export const parseApiErrors = (error) => {
   //if( error.violations ){
      return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
          parsedErrors[violation['propertyPath']] = violation['message'];
          return parsedErrors;
        },
        {}
      );
   //}
};

//for pagination
export const hydraPageCount = (collection) => {
  if (!collection['hydra:view']) {
    return 1;
  }

  return Number(
    collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
  );
};


const canCreateProjectRoles = ['ROLE_CHEF_PROJET', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'];

export const canCreateProject = (userData) => {
  return null !== userData
    && userData.roles.some(
      userRoles => canCreateProjectRoles.includes(userRoles)
    );
};
  
  