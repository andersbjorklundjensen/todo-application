import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField
} from '@material-ui/core';

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

const ProjectListModal = ({ open, setOpen, project, onSubmit }) => {
  const classes = useStyles();
  const [modalProjectName, setModalProjectName] = useState('');
  return (
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
          <form onSubmit={(e) => onSubmit(e, project.id, modalProjectName)}>
            <TextField label="Project name" value={modalProjectName} onChange={(e) => setModalProjectName(e.target.value)} />
          </form>
        </div>
      </Fade>
    </Modal>
  )
}

export default ProjectListModal;