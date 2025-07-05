export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'admin' | 'member';
}

export interface Space {
  id: string;
  name: string;
  emoji: string;
  color: string;
  features: string[];
  folders: Folder[];
}

export interface Folder {
  id: string;
  name: string;
  emoji: string;
  spaceId: string;
  lists: List[];
}

export interface List {
  id: string;
  name: string;
  emoji: string;
  folderId: string;
  tasks: Task[];
  viewType: 'list' | 'table' | 'timeline';
  customFields?: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea';
  options?: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  listId: string;
  customFieldValues?: Record<string, any>;
  attachments?: string[];
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
}

export interface Doc {
  id: string;
  title: string;
  content: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  spaceId: string;
}