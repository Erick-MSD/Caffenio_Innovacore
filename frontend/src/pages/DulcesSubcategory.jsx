import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '@assets/images/logo.png';

function DulcesSubcategory() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items, total, clearCart } = useCart();

  const subcategorias = [
    { id: 'nieve', nombre: 'Nieve' },
    { id: 'reposteria', nombre: 'Repostería' },
  ];

  const handleCancelarPedido = () => {
    clearCart();
    navigate('/');
  };

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleIdentificarQR = () => {
    navigate('/login');
  };

  const handleSubcategoryClick = (subcategoria) => {
    navigate(`/category/4/${subcategoria.id}`);
  };

  const handleFinalizarPedido = () => {
    navigate('/order-summary');
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
              <>
                {/* Botón Cancelar Pedido - solo si NO está autenticado */}
                <button
                  onClick={handleCancelarPedido}
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Cancelar Pedido
                </button>
                {/* Botón Identificate con QR - solo si NO está autenticado */}
                <button
                  onClick={handleIdentificarQR}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Identificate con QR
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contenido Principal - 2 Columnas */}
      <div className="flex-1 px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Columna Izquierda - Subcategorías */}
          <div className="flex-1">
            {/* Título de Categoría */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-2">
                Dulces
              </h1>
              <p className="text-xl md:text-2xl text-gray-700">
                Selecciona tu favorito de hoy
              </p>
            </div>

            {/* Subcategorías */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {subcategorias.map((subcategoria) => (
                <button
                  key={subcategoria.id}
                  onClick={() => handleSubcategoryClick(subcategoria)}
                  className="bg-white hover:bg-gray-50 rounded-3xl shadow-md hover:shadow-lg transition-all p-12 md:p-16 flex flex-col items-center justify-center min-h-[220px] md:min-h-[260px]"
                >
                  {/* Área de icono/imagen - placeholder */}
                  <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-200 rounded-xl"></div>
                  </div>
                  
                  {/* Nombre de subcategoría */}
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-800 text-center">
                    {subcategoria.nombre}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Columna Derecha - Pedido/Carrito */}
          <div className="w-80 md:w-96 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 sticky top-8">
              {/* Título del panel */}
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
                Tu Pedido
              </h2>

              {/* Contenido del carrito */}
              {items.length === 0 ? (
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                  <p className="text-xl md:text-2xl font-bold text-gray-400 text-center">
                    Agrega productos
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                      {/* Info */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{item.nombre}</h4>
                        <p className="text-base text-gray-600">${item.precio}</p>
                      </div>

                      {/* Cantidad */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-gray-800">
                          x{item.cantidad}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl md:text-2xl font-medium text-gray-700">Total:</span>
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">${total}</span>
                </div>
                
                <button
                  disabled={items.length === 0}
                  onClick={handleFinalizarPedido}
                  className={`w-full font-semibold py-4 rounded-xl text-lg md:text-xl transition-colors ${
                    items.length > 0
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DulcesSubcategory;
