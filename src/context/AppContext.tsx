import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Space, Task, Automation, Doc, ChatMessage } from '../types';
import { initialUsers, initialSpace, initialAutomations, initialDocs } from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  spaces: Space[];
  currentSpace: Space | null;
  automations: Automation[];
  docs: Doc[];
  chatMessages: ChatMessage[];
  sidebarCollapsed: boolean;
  currentView: 'tasks' | 'docs' | 'chat' | 'automations';
  
  // Auth functions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Space functions
  setCurrentSpace: (space: Space) => void;
  
  // Task functions
  addTask: (listId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  
  // UI functions
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentView: (view: 'tasks' | 'docs' | 'chat' | 'automations') => void;
  
  // Chat functions
  addChatMessage: (content: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(initialUsers);
  const [spaces, setSpaces] = useState<Space[]>([initialSpace]);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(initialSpace);
  const [automations] = useState<Automation[]>(initialAutomations);
  const [docs] = useState<Doc[]>(initialDocs);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<'tasks' | 'docs' | 'chat' | 'automations'>('tasks');

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addTask = (listId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSpaces(prevSpaces => 
      prevSpaces.map(space => ({
        ...space,
        folders: space.folders.map(folder => ({
          ...folder,
          lists: folder.lists.map(list => 
            list.id === listId 
              ? { ...list, tasks: [...list.tasks, newTask] }
              : list
          )
        }))
      }))
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setSpaces(prevSpaces => 
      prevSpaces.map(space => ({
        ...space,
        folders: space.folders.map(folder => ({
          ...folder,
          lists: folder.lists.map(list => ({
            ...list,
            tasks: list.tasks.map(task => 
              task.id === taskId 
                ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                : task
            )
          }))
        }))
      }))
    );
  };

  const deleteTask = (taskId: string) => {
    setSpaces(prevSpaces => 
      prevSpaces.map(space => ({
        ...space,
        folders: space.folders.map(folder => ({
          ...folder,
          lists: folder.lists.map(list => ({
            ...list,
            tasks: list.tasks.filter(task => task.id !== taskId)
          }))
        }))
      }))
    );
  };

  const addChatMessage = (content: string) => {
    if (!currentUser || !currentSpace) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content,
      author: currentUser.name,
      timestamp: new Date().toISOString(),
      spaceId: currentSpace.id
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      spaces,
      currentSpace,
      automations,
      docs,
      chatMessages,
      sidebarCollapsed,
      currentView,
      login,
      logout,
      setCurrentSpace,
      addTask,
      updateTask,
      deleteTask,
      setSidebarCollapsed,
      setCurrentView,
      addChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};