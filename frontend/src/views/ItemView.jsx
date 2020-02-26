import React, { useContext, useState, useEffect} from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TopBar from '../components/TopBar';
import Item from '../api/Item';
import { AuthContext } from '../contexts/AuthContext';

const ItemView = () => {
  const [name, setName] = useState('');
  const [editingState, setEditingState] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  const { authContext } = useContext(AuthContext);
  const item = new Item(authContext.token);

  useEffect(() => {
    item.getItem(id)
      .then((response) => setName(response.item.name))
      .catch((e) => console.log(e));
  }, [item, id]);

  const onSaveClick = (id, name) => {
    item.editItem(id, name)
      .then(() => item.getItem(id))
      .then((response) => setName(response.item.name))
      .then(() => setEditingState(false))
      .catch((e) => console.log(e));
  };

  const onEditIconClick = () => {
    setEditingState(true);
  };

  const onDeleteIconClick = () => {
    item.deleteItem(id)
      .then(() => history.push('/items'))
      .catch((e) => console.log(e));
  };

  const normalState = (
    <Typography component="h1" variant="h5">
      {name}
    </Typography>
  );

  const editState = (
    <div>
      <TextField 
        id="standard-basic" 
        label="Standard" 
        value={name} 
        onChange={(e) => setName(e.target.value)}/>
      <Button variant="contained" color="primary" onClick={() => onSaveClick(id, name)}>
              Save
      </Button>
    </div>
  );

  return (
    <div>
      <TopBar />
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5">
Item view
        </Typography>
        <IconButton onClick={() => onEditIconClick()}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDeleteIconClick()}>
          <DeleteIcon />
        </IconButton>
        {editingState ? editState : normalState}
      </Container>
    </div>
  );
};

export default ItemView;
