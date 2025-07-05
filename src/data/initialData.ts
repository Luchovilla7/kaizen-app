import { Space, User, Automation, Doc } from '../types';

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Luciano',
    email: 'luciano@kaizenpro.com',
    password: 'luciano123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Cinthia',
    email: 'cinthia@kaizenpro.com',
    password: 'cinthia321',
    role: 'member'
  },
  {
    id: '3',
    name: 'Facu',
    email: 'facu@kaizenpro.com',
    password: 'facu456',
    role: 'member'
  }
];

export const initialSpace: Space = {
  id: 'space-1',
  name: '🚀 Agencia Digital Pro',
  emoji: '🚀',
  color: '#000000',
  features: ['Tareas', 'Docs', 'Chat', 'Formularios', 'Automatizaciones', 'Prioridades'],
  folders: [
    {
      id: 'folder-1',
      name: '📌 Proyectos de Clientes',
      emoji: '📌',
      spaceId: 'space-1',
      lists: [
        {
          id: 'list-1',
          name: '🌐 Sitios Web',
          emoji: '🌐',
          folderId: 'folder-1',
          tasks: [],
          viewType: 'list'
        },
        {
          id: 'list-2',
          name: '🛒 E-commerce',
          emoji: '🛒',
          folderId: 'folder-1',
          tasks: [],
          viewType: 'list'
        },
        {
          id: 'list-3',
          name: '📲 Landings & Embudos',
          emoji: '📲',
          folderId: 'folder-1',
          tasks: [],
          viewType: 'list'
        },
        {
          id: 'list-4',
          name: '🧠 Webs con IA',
          emoji: '🧠',
          folderId: 'folder-1',
          tasks: [],
          viewType: 'list'
        }
      ]
    },
    {
      id: 'folder-2',
      name: '🎯 Marketing & Publicidad',
      emoji: '🎯',
      spaceId: 'space-1',
      lists: [
        {
          id: 'list-5',
          name: '📆 Calendario de contenidos',
          emoji: '📆',
          folderId: 'folder-2',
          tasks: [],
          viewType: 'timeline'
        },
        {
          id: 'list-6',
          name: '📤 Email Marketing',
          emoji: '📤',
          folderId: 'folder-2',
          tasks: [],
          viewType: 'list'
        },
        {
          id: 'list-7',
          name: '🎯 Ads Meta & Google',
          emoji: '🎯',
          folderId: 'folder-2',
          tasks: [],
          viewType: 'list'
        }
      ]
    },
    {
      id: 'folder-3',
      name: '🤖 IA y Automatizaciones',
      emoji: '🤖',
      spaceId: 'space-1',
      lists: [
        {
          id: 'list-8',
          name: '🤖 Automatizaciones internas',
          emoji: '🤖',
          folderId: 'folder-3',
          tasks: [],
          viewType: 'list'
        },
        {
          id: 'list-9',
          name: '🧠 Proyectos IA clientes',
          emoji: '🧠',
          folderId: 'folder-3',
          tasks: [],
          viewType: 'list'
        }
      ]
    },
    {
      id: 'folder-4',
      name: '👥 CRM de Clientes',
      emoji: '👥',
      spaceId: 'space-1',
      lists: [
        {
          id: 'list-10',
          name: 'Clientes',
          emoji: '👥',
          folderId: 'folder-4',
          tasks: [],
          viewType: 'table',
          customFields: [
            { id: 'email', name: 'Email', type: 'text' },
            { id: 'phone', name: 'Teléfono', type: 'number' },
            { id: 'status', name: 'Estado', type: 'select', options: ['Lead', 'En negociación', 'Activo', 'Finalizado'] },
            { id: 'project', name: 'Proyecto vinculado', type: 'text' },
            { id: 'notes', name: 'Notas', type: 'textarea' },
            { id: 'startDate', name: 'Fecha de inicio', type: 'date' }
          ]
        }
      ]
    },
    {
      id: 'folder-5',
      name: '📋 SOPs & Procesos Internos',
      emoji: '📋',
      spaceId: 'space-1',
      lists: []
    }
  ]
};

export const initialAutomations: Automation[] = [
  {
    id: 'auto-1',
    name: 'Notificar cliente al finalizar tarea',
    trigger: 'Tarea movida a "Finalizado"',
    action: 'Enviar correo al cliente',
    isActive: true
  },
  {
    id: 'auto-2',
    name: 'Recordatorio de tareas sin actualizar',
    trigger: 'Tarea sin actualizar por 3 días',
    action: 'Enviar recordatorio al responsable',
    isActive: true
  },
  {
    id: 'auto-3',
    name: 'Asignación automática de nuevas tareas',
    trigger: 'Nueva tarea creada',
    action: 'Asignar automáticamente y agregar fecha de entrega',
    isActive: true
  }
];

export const initialDocs: Doc[] = [
  {
    id: 'doc-1',
    title: '✅ SOP: Onboarding cliente',
    content: '# SOP: Proceso de Onboarding de Cliente\n\n## Paso 1: Reunión inicial\n- Definir objetivos del proyecto\n- Establecer timeline\n- Recopilar materiales necesarios\n\n## Paso 2: Propuesta comercial\n- Crear propuesta detallada\n- Enviar cotización\n- Seguimiento comercial',
    folderId: 'folder-5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Luciano'
  },
  {
    id: 'doc-2',
    title: '✅ SOP: Entrega de sitio',
    content: '# SOP: Proceso de Entrega de Sitio Web\n\n## Pre-entrega\n- Testing completo\n- Optimización de velocidad\n- Revisión de SEO básico\n\n## Entrega\n- Capacitación al cliente\n- Entrega de credenciales\n- Documentación técnica',
    folderId: 'folder-5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Cinthia'
  },
  {
    id: 'doc-3',
    title: '✅ SOP: Automatizaciones',
    content: '# SOP: Implementación de Automatizaciones\n\n## Análisis inicial\n- Identificar procesos repetitivos\n- Mapear flujo de trabajo actual\n- Definir objetivos de automatización\n\n## Implementación\n- Configurar herramientas\n- Testing de automatizaciones\n- Documentar procesos',
    folderId: 'folder-5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Facu'
  },
  {
    id: 'doc-4',
    title: '✅ SOP: Uso de IA en contenidos',
    content: '# SOP: Uso de IA para Creación de Contenidos\n\n## Herramientas recomendadas\n- ChatGPT para textos\n- Midjourney para imágenes\n- Claude para análisis\n\n## Proceso de creación\n- Definir brief detallado\n- Generar contenido base\n- Revisar y personalizar\n- Optimizar para SEO',
    folderId: 'folder-5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Luciano'
  }
];