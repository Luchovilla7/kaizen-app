import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText, 
  Zap,
  Menu,
  LogOut,
  Search
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { 
    currentSpace, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    currentView, 
    setCurrentView,
    logout,
    currentUser
  } = useApp();
  
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['folder-1']);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  if (!currentSpace) return null;

  const filteredFolders = currentSpace.folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    folder.lists.some(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ${
      sidebarCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-e1711238264733.png" 
                alt="KAIZEN PRO" 
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h1 className="text-white font-bold text-lg">KAIZEN PRO</h1>
                <p className="text-gray-400 text-xs">{currentUser?.name}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar tareas, listas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="p-4 space-y-2">
            <button
              onClick={() => setCurrentView('tasks')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'tasks' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FileText size={20} />
              <span>Tareas</span>
            </button>
            
            <button
              onClick={() => setCurrentView('docs')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'docs' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FileText size={20} />
              <span>Docs</span>
            </button>
            
            <button
              onClick={() => setCurrentView('chat')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'chat' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => setCurrentView('automations')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'automations' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Zap size={20} />
              <span>Automatizaciones</span>
            </button>
          </div>
        )}

        {/* Space Content */}
        {!sidebarCollapsed && currentView === 'tasks' && (
          <div className="px-4 pb-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{currentSpace.name}</h3>
                <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded">
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-xs text-gray-400 space-x-2">
                {currentSpace.features.map((feature, index) => (
                  <span key={index} className="bg-gray-800 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Folders */}
            <div className="space-y-1">
              {filteredFolders.map(folder => (
                <div key={folder.id}>
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full flex items-center space-x-2 px-2 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {expandedFolders.includes(folder.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span className="text-sm">{folder.name}</span>
                  </button>
                  
                  {expandedFolders.includes(folder.id) && (
                    <div className="ml-6 space-y-1">
                      {folder.lists.map(list => (
                        <div
                          key={list.id}
                          className="flex items-center space-x-2 px-2 py-1 text-gray-400 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                        >
                          <span className="text-xs">{list.name}</span>
                          <span className="text-xs bg-gray-700 px-1 rounded">
                            {list.tasks.length}
                          </span>
                        </div>
                      ))}
                      <button className="flex items-center space-x-2 px-2 py-1 text-gray-500 hover:text-gray-300 transition-colors">
                        <Plus size={12} />
                        <span className="text-xs">Nueva lista</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {!sidebarCollapsed ? (
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <Users size={20} />
              <span>Usuarios</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={20} />
              <span>Configuración</span>
            </button>
            <button 
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button className="w-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <Users size={20} />
            </button>
            <button className="w-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
            <button 
              onClick={logout}
              className="w-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;