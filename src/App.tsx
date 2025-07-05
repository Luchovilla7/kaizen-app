import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TaskView from './components/TaskView';
import DocsView from './components/DocsView';
import ChatView from './components/ChatView';
import AutomationsView from './components/AutomationsView';

const AppContent: React.FC = () => {
  const { currentUser, currentView } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'tasks':
        return <TaskView />;
      case 'docs':
        return <DocsView />;
      case 'chat':
        return <ChatView />;
      case 'automations':
        return <AutomationsView />;
      default:
        return <TaskView />;
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      <Sidebar />
      {renderCurrentView()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;