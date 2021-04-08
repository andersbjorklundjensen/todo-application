import React, { Fragment, useContext, useState } from 'react';
import {
  List,
} from '@material-ui/core';
import ProjectListItem from '../components/ProjectListItem';
import { ProjectContext } from '../contexts/ProjectContext';
import { AuthContext } from '../contexts/AuthContext';
import ProjectApiWrapper from '../api/Project';
import ProjectListModal from './ProjectListModal';

const ProjectList = () => {
  const [open, setOpen] = useState(false);
  const { projectContext, projectContextAPI } = useContext(ProjectContext);
  const { authContext } = useContext(AuthContext);

  const projectApiWrapper = new ProjectApiWrapper(authContext.token);

  const onProjectItemClick = (projectId, projectName) => {
    projectContextAPI.setCurrentProject(projectId, projectName);
  };

  const onEditProjectFormSubmit = async (e, id, name) => {
    e.preventDefault();
    await projectApiWrapper.editProject(id, name)
      .catch((e) => console.log(e));

    projectContextAPI.editProject(id, name);
    setOpen(false);
  }

  const onDeleteIconClick = async (id) => {
    await projectApiWrapper.deleteProject(id)
      .catch((e) => console.log(e));

    projectContextAPI.deleteProject(id);
  };

  return (
    <List id="projectList" component="div" disablePadding>
      {projectContext.projects && projectContext.projects.map((project, index) => (
        <Fragment key={index}>
          <ProjectListItem
            onClick={() => onProjectItemClick(project.id, project.name)}
            onEditIconClick={() => setOpen(true)}
            onDeleteIconClick={() => onDeleteIconClick(project.id)}
            selected={projectContext.currentProject === project.id}
            project={project}
          />
          <ProjectListModal open={open} setOpen={setOpen} project={project} 
          onSubmit={onEditProjectFormSubmit} />
        </Fragment>
      ))}
    </List>
  )
}

export default ProjectList;