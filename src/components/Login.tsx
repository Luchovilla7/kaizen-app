import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError('Credenciales incorrectas');
    }
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    login(userEmail, userPassword);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo-e1711238264733.png" 
              alt="KAIZEN PRO" 
              className="h-16 w-16 rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">KAIZEN PRO</h2>
          <p className="text-gray-400">Gestión profesional de proyectos</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <LogIn className="mr-2" size={20} />
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6">
          <div className="text-center text-gray-400 text-sm mb-4">
            Usuarios de prueba:
          </div>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('luciano@kaizenpro.com', 'luciano123')}
              className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="text-white font-medium">Luciano (Admin)</div>
              <div className="text-gray-400 text-sm">luciano@kaizenpro.com</div>
            </button>
            <button
              onClick={() => quickLogin('cinthia@kaizenpro.com', 'cinthia321')}
              className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="text-white font-medium">Cinthia</div>
              <div className="text-gray-400 text-sm">cinthia@kaizenpro.com</div>
            </button>
            <button
              onClick={() => quickLogin('facu@kaizenpro.com', 'facu456')}
              className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="text-white font-medium">Facu</div>
              <div className="text-gray-400 text-sm">facu@kaizenpro.com</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;