import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '@assets/images/logo.png';

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { clearCart } = useCart();

  const ticketNumber = location.state?.ticketNumber;
  const items = location.state?.items || [];
  const total = location.state?.total || 0;
  const subtotal = location.state?.subtotal || 0;
  const iva = location.state?.iva || 0;
  const descuento = location.state?.descuento || 0;

  useEffect(() => {
    // Limpiar el carrito al confirmar el pedido
    clearCart();
  }, []);

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleNuevoPedido = () => {
    navigate('/order');
  };

  const handleInicio = () => {
    navigate('/');
  };

  if (!ticketNumber) {
    navigate('/');
    return null;
  }

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
                <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-3">
                  <div className="text-sm text-gray-700">
                    Tu saldo prepago: <span className="font-semibold">${user.saldoPrepagado}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    Tu monedero: <span className="font-semibold">${user.monedero}</span>
                  </div>
                </div>
                <button
                  onClick={handleCerrarSesion}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-2xl w-full">
          {/* Tarjeta de confirmación */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            {/* Ícono de check */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ¡Pedido Confirmado!
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Tu pedido ha sido registrado exitosamente
            </p>

            {/* Número de Ticket */}
            <div className="bg-yellow-50 border-4 border-yellow-400 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 mb-3">Tu número de ticket es:</p>
              <p className="text-7xl md:text-8xl font-bold text-yellow-600">
                {ticketNumber}
              </p>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resumen de tu pedido</h3>
              
              {/* Lista de productos */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-lg text-gray-800">{item.cantidad}x {item.nombre}</span>
                      {item.personalizacion && item.personalizacion.sabor && item.personalizacion.sabor !== 'Regular' && (
                        <span className="text-sm text-gray-600 ml-2">({item.personalizacion.sabor})</span>
                      )}
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desglose */}
              <div className="border-t-2 border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">IVA (16%):</span>
                  <span className="font-semibold text-gray-800">${iva.toFixed(2)}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Descuento:</span>
                    <span className="font-semibold text-green-600">-${descuento.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t-2 border-gray-300">
                  <span className="text-gray-800">TOTAL:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-blue-50 border border-blue-300 rounded-2xl p-6 mb-8">
              <p className="text-xl text-gray-800 leading-relaxed">
                Pasa a <span className="font-bold">caja</span> con tu número de ticket para recoger tu pedido
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4">
              <button
                onClick={handleNuevoPedido}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl text-lg transition-colors"
              >
                Nuevo Pedido
              </button>
              <button
                onClick={handleInicio}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-4 rounded-xl text-lg transition-colors"
              >
                Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
