import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Calendar, User, Flag, MoreHorizontal, List, Table, Baseline as Timeline, Filter, Download } from 'lucide-react';
import TaskModal from './TaskModal';

const TaskView: React.FC = () => {
  const { currentSpace, addTask, updateTask, deleteTask, users } = useApp();
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'list' | 'table' | 'timeline'>('list');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  if (!currentSpace) return null;

  const allLists = currentSpace.folders.flatMap(folder => folder.lists);
  const currentList = selectedList ? allLists.find(list => list.id === selectedList) : null;
  const tasks = currentList ? currentList.tasks : [];

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-600';
      case 'in-progress': return 'bg-blue-600';
      case 'review': return 'bg-yellow-600';
      case 'done': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">
              {currentList ? currentList.name : 'Todas las Tareas'}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewType('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewType === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewType('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewType === 'table' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Table size={20} />
              </button>
              <button
                onClick={() => setViewType('timeline')}
                className={`p-2 rounded-lg transition-colors ${
                  viewType === 'timeline' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Timeline size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedList || ''}
              onChange={(e) => setSelectedList(e.target.value || null)}
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Todas las listas</option>
              {currentSpace.folders.map(folder => (
                <optgroup key={folder.id} label={folder.name}>
                  {folder.lists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Todos los estados</option>
              <option value="todo">Por hacer</option>
              <option value="in-progress">En progreso</option>
              <option value="review">En revisión</option>
              <option value="done">Completado</option>
            </select>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Filter size={20} />
              <span>Filtros</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Download size={20} />
              <span>Exportar</span>
            </button>
            
            <button
              onClick={handleCreateTask}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus size={20} />
              <span>Nueva Tarea</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewType === 'list' && (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                onClick={() => handleEditTask(task)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <Flag className={`${getPriorityColor(task.priority)}`} size={16} />
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    {task.assignee && (
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{users.find(u => u.id === task.assignee)?.name}</span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
                
                {task.description && (
                  <p className="text-gray-400 text-sm mt-2">{task.description}</p>
                )}
              </div>
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  {selectedList ? 'No hay tareas en esta lista' : 'No hay tareas que mostrar'}
                </div>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Crear primera tarea
                </button>
              </div>
            )}
          </div>
        )}

        {viewType === 'table' && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Tarea</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Estado</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Prioridad</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Asignado</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Fecha límite</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => (
                  <tr key={task.id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4">
                      <div className="text-white font-medium">{task.title}</div>
                      {task.description && (
                        <div className="text-gray-400 text-sm">{task.description}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Flag className={`${getPriorityColor(task.priority)}`} size={16} />
                    </td>
                    <td className="p-4 text-gray-300">
                      {task.assignee ? users.find(u => u.id === task.assignee)?.name : '-'}
                    </td>
                    <td className="p-4 text-gray-300">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No hay tareas que mostrar</div>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Crear primera tarea
                </button>
              </div>
            )}
          </div>
        )}

        {viewType === 'timeline' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-center text-gray-400 py-12">
              <Calendar size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Vista Timeline</h3>
              <p>La vista de timeline estará disponible próximamente</p>
            </div>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          listId={selectedList}
          onClose={() => setShowTaskModal(false)}
          onSave={(taskData) => {
            if (editingTask) {
              updateTask(editingTask.id, taskData);
            } else if (selectedList) {
              addTask(selectedList, taskData);
            }
            setShowTaskModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TaskView;