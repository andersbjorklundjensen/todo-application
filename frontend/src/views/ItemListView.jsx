import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Item from '../api/Item';
import { AuthContext } from '../contexts/AuthContext';
import TopBar from '../components/TopBar';

const ItemListView = () => {
  const [itemList, setItemList] = useState([]);
  const [name, setName] = useState('');

  const { authContext } = useContext(AuthContext);
  const item = new Item(authContext.token);

  useEffect(() => {
    item.getAllItems()
      .then((response) => {
        console.log(response);
        setItemList(response.items);     
      })
      .catch((e) => console.log(e));
  }, [item]);

  const onAddItemClick = (name) => {
    item.saveItem(name)
      .then(() => setName(''))
      .then(() => item.getAllItems())
      .then((response) => setItemList(response.items))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <TopBar />
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5">
          Item list
        </Typography>
        <Grid
          container
          justify="center"
        >
          <form noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              label="Add item" 
              value={name} 
              onChange={(e) => setName(e.target.value)} />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => onAddItemClick(name)}>
Add item
            </Button>

          </form>

        </Grid>
        <List dense>
          {itemList.map((item, index) => (
            <ListItem key={index} button>
              <Link to={`/item/${item._id}`}>
                <ListItemText 
                  primary={`Line item ${index + 1} - ${item.name}`} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default ItemListView;
