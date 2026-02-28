import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '@assets/images/logo.png';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Login simulado con saldos de la imagen
    const mockUser = {
      id: 1,
      nombre: 'Usuario',
      email: formData.email,
      saldoPrepagado: 584,
      monedero: 75,
    };
    
    login(mockUser);
    navigate('/order');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-caffenio-bg font-gilroy">
      {/* Logo */}
      <div className="p-6 md:p-8">
        <img src={logo} alt="Caffenio Logo" className="h-20 md:h-24" />
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-8">
            Identificate con la App
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full border-2 border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors"
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
