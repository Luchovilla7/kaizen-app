import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const DocsView: React.FC = () => {
  const { docs, currentSpace } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const filteredDocs = docs.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDocData = selectedDoc ? docs.find(doc => doc.id === selectedDoc) : null;

  return (
    <div className="flex-1 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">📄 Documentos</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Plus size={20} />
              <span>Nuevo Doc</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Docs List */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">SOPs & Procesos Internos</h3>
            <div className="space-y-2">
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedDoc === doc.id 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{doc.title}</h4>
                      <p className="text-xs opacity-75 mt-1">
                        Por {doc.author} • {new Date(doc.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <FileText size={16} className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doc Content */}
        <div className="flex-1 overflow-hidden">
          {selectedDocData ? (
            <div className="h-full flex flex-col">
              {/* Doc Header */}
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedDocData.title}</h2>
                    <p className="text-sm text-gray-400">
                      Última actualización: {new Date(selectedDocData.updatedAt).toLocaleDateString()} por {selectedDocData.author}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Doc Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-invert max-w-none">
                    {selectedDocData.content.split('\n').map((line, index) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-bold text-white mb-4">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-semibold text-white mb-3 mt-6">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={index} className="text-lg font-medium text-white mb-2 mt-4">{line.substring(4)}</h3>;
                      } else if (line.startsWith('- ')) {
                        return <li key={index} className="text-gray-300 mb-1">{line.substring(2)}</li>;
                      } else if (line.trim() === '') {
                        return <br key={index} />;
                      } else {
                        return <p key={index} className="text-gray-300 mb-3">{line}</p>;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">Selecciona un documento</h3>
                <p className="text-gray-500">Elige un documento de la lista para verlo aquí</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocsView;