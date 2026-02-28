import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '@assets/images/logo.png';

function Order() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const categorias = [
    { id: 1, nombre: 'Calientes' },
    { id: 2, nombre: 'Fríos' },
    { id: 3, nombre: 'Alimentos' },
    { id: 4, nombre: 'Dulces' },
  ];

  const handleCancelarPedido = () => {
    navigate('/');
  };

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleCategoriaClick = (categoria) => {
    console.log('Categoría seleccionada:', categoria.nombre);
    // TODO: Navegar a la lista de productos de esa categoría
  };

  return (
    <div className="min-h-screen flex flex-col bg-caffenio-bg font-gilroy">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <img src={logo} alt="Caffenio Logo" className="h-16 md:h-20" />

          {/* Acciones según autenticación */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Cuadro de Saldos - solo si está autenticado */}
                <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-3">
                  <div className="text-sm text-gray-700">
                    Tu saldo prepago: <span className="font-semibold">${user.saldoPrepagado}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    Tu monedero: <span className="font-semibold">${user.monedero}</span>
                  </div>
                </div>
                {/* Botón Cerrar Sesión - verde como en la imagen */}
                <button
                  onClick={handleCerrarSesion}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              /* Botón Cancelar Pedido - solo si NO está autenticado */
              <button
                onClick={handleCancelarPedido}
                className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Cancelar Pedido
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Saludo */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
              ¡Hola!
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              ¿Cuál es tu antojo el día de hoy?
            </p>
          </div>

          {/* Categorías - 4 cuadros horizontales como en la imagen */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => handleCategoriaClick(categoria)}
                className="bg-white hover:bg-gray-50 rounded-3xl shadow-md hover:shadow-lg transition-all p-8 md:p-12 flex flex-col items-center justify-center min-h-[200px] md:min-h-[240px]"
              >
                {/* Área de icono/imagen - placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-xl"></div>
                </div>
                
                {/* Nombre de categoría */}
                <h3 className="text-lg md:text-xl font-medium text-gray-800 text-center">
                  {categoria.nombre}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
