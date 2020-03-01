import React, { createContext, useReducer } from 'react';
import ProjectReducer from '../reducers/ProjectReducer';
import PropTypes from 'prop-types';

export const ProjectContext = createContext();

const initialState = {
  projects: [],
  currentProject: null,

};

const ProjectContextProvider = (props) => {
  const [projectContext, projectDispatch] = useReducer(ProjectReducer, initialState, () => {
    const projectData = localStorage.getItem('todo-app:project');
    return projectData ? JSON.parse(projectData) : initialState;
  });
  
  return (
    <ProjectContext.Provider value={{ projectContext, projectDispatch }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

ProjectContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default ProjectContextProvider;
