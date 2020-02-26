import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ItemView from './views/ItemView';
import ItemListView from './views/ItemListView';

const App =() => {
  return (
    <AuthContextProvider>
      <Router>
        <Route path="/login" component={LoginView} exact />
        <Route path="/register" component={RegisterView} exact />
        <ProtectedRoute path="/item/:id" component={ItemView} exact />
        <ProtectedRoute path="/items" component={ItemListView} exact />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
