import React, { useContext } from 'react';
import {
  List,
} from '@material-ui/core';
import ProjectListItem from '../components/ProjectListItem';
import { ProjectContext } from '../contexts/ProjectContext';
import { AuthContext } from '../contexts/AuthContext';
import ProjectApiWrapper from '../api/Project';

const ProjectList = () => {
  const { projectContext, projectContextAPI } = useContext(ProjectContext);
  const { authContext } = useContext(AuthContext);

  const projectApiWrapper = new ProjectApiWrapper(authContext.token);

  const onProjectItemClick = (projectId, projectName) => {
    projectContextAPI.setCurrentProject(projectId, projectName);
  };

  const onDeleteIconClick = async (id) => {
    await projectApiWrapper.deleteProject(id)
      .catch((e) => console.log(e));

    projectContextAPI.deleteProject(id);
  };

  return (
    <List id="projectList" component="div" disablePadding>
      {projectContext.projects && projectContext.projects.map((project, index) => (
        <ProjectListItem
          onClick={() => onProjectItemClick(project.id, project.name)}
          onDeleteIconClick={() => onDeleteIconClick(project.id)}
          selected={projectContext.currentProject === project.id}
          key={index}
          project={project}
          index={index}
        />
      ))}
    </List>
  )
}

export default ProjectList;