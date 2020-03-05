import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ProjectContextProvider from './contexts/ProjectContext';
import TodoContextProvider from './contexts/TodoContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import DashboardView from './views/DashboardView';

const App = () => (
  <AuthContextProvider>
    <ProjectContextProvider>
      <TodoContextProvider>
        <Router>
          <Route path="/login" component={LoginView} exact />
          <Route path="/register" component={RegisterView} exact />
          <ProtectedRoute path="/dashboard" component={DashboardView} exact />
        </Router>
      </TodoContextProvider>
    </ProjectContextProvider>
  </AuthContextProvider>
);

export default App;
