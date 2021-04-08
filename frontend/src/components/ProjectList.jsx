import React, { Fragment, useContext, useState } from 'react';
import {
  List,
} from '@material-ui/core';
import ProjectListItem from '../components/ProjectListItem';
import { ProjectContext } from '../contexts/ProjectContext';
import { AuthContext } from '../contexts/AuthContext';
import ProjectApiWrapper from '../api/Project';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProjectList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
        <Fragment>
          <ProjectListItem
            onClick={() => onProjectItemClick(project.id, project.name)}
            onEditIconClick={() => setOpen(true)}
            onDeleteIconClick={() => onDeleteIconClick(project.id)}
            selected={projectContext.currentProject === project.id}
            key={index}
            project={project}
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            className={classes.modal}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">{project.name}</h2>
              </div>
            </Fade>
          </Modal>
        </Fragment>
      ))}
    </List>
  )
}

export default ProjectList;