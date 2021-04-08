import React, { useContext } from 'react';
import {
  List,
} from '@material-ui/core';
import ProjectListItem from '../components/ProjectListItem';
import { ProjectContext } from '../contexts/ProjectContext';

const ProjectList = () => {
  const { projectContext, projectContextAPI } = useContext(ProjectContext);

  const onProjectItemClick = (projectId, projectName) => {
    projectContextAPI.setCurrentProject(projectId, projectName);
  };

  return (
    <List id="projectList" component="div" disablePadding>
      {projectContext.projects && projectContext.projects.map((project, index) => (
        <ProjectListItem
          onClick={() => onProjectItemClick(project.id, project.name)}
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