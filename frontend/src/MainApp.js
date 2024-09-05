import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext'; // Import SidebarProvider

function MainApp() {
  return (
    <Router>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Router>
  );
}

export default MainApp;
