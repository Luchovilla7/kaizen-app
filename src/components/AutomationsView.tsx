import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Plus, Play, Pause, Settings, Trash2 } from 'lucide-react';

const AutomationsView: React.FC = () => {
  const { automations } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex-1 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">⚙️ Automatizaciones</h1>
            <p className="text-sm text-gray-400">
              {automations.filter(a => a.isActive).length} de {automations.length} automatizaciones activas
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={20} />
            <span>Nueva Automatización</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {automations.map(automation => (
            <div
              key={automation.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      automation.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <h3 className="text-lg font-semibold text-white">
                      {automation.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      automation.isActive 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {automation.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Disparador:</span>
                      <span className="text-sm text-white bg-gray-700 px-2 py-1 rounded">
                        {automation.trigger}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Acción:</span>
                      <span className="text-sm text-white bg-gray-700 px-2 py-1 rounded">
                        {automation.action}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    {automation.isActive ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {automations.length === 0 && (
            <div className="text-center py-12">
              <Zap size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No hay automatizaciones</h3>
              <p className="text-gray-500 mb-6">
                Crea tu primera automatización para optimizar tu flujo de trabajo
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Crear Automatización
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Automation Templates */}
      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Plantillas de Automatización</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Zap size={16} className="text-yellow-500" />
              <span className="text-sm font-medium text-white">Notificación de finalización</span>
            </div>
            <p className="text-xs text-gray-400">
              Envía un email cuando una tarea se marca como completada
            </p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Zap size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-white">Recordatorio automático</span>
            </div>
            <p className="text-xs text-gray-400">
              Envía recordatorios para tareas sin actualizar
            </p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Zap size={16} className="text-green-500" />
              <span className="text-sm font-medium text-white">Asignación inteligente</span>
            </div>
            <p className="text-xs text-gray-400">
              Asigna automáticamente nuevas tareas según criterios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationsView;