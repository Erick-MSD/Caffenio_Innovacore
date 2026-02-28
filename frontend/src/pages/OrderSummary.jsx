import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { crearOrden } from '../services/api';
import logo from '@assets/images/logo.png';

function OrderSummary() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items, total, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcular desglose
  const subtotal = total;
  const iva = Math.round(subtotal * 0.16 * 100) / 100; // IVA 16%
  const descuento = 0.00; // Por ahora sin descuento
  const totalFinal = subtotal + iva - descuento;

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

  const handleAgregarProducto = () => {
    navigate('/order');
  };

  const handleProcederPago = async () => {
    try {
      setLoading(true);
      setError(null);

      // Preparar datos de la orden
      const ordenData = {
        clienteId: user?.id || null,
        subtotal: subtotal,
        iva: iva,
        descuento: descuento,
        total: totalFinal,
        items: items.map(item => ({
          productoId: typeof item.id === 'string' ? parseInt(item.id.split('-')[0]) : item.id,
          productoNombre: item.nombre,
          cantidad: item.cantidad,
          precioUnitario: item.precio,
          subtotal: item.precio * item.cantidad,
          personalizacion: item.personalizacion || null
        }))
      };

      // Enviar orden al backend
      const response = await crearOrden(ordenData);

      if (response.success) {
        navigate('/order-confirmation', { 
          state: { 
            ticketNumber: response.numeroTicket,
            items,
            total: totalFinal,
            subtotal,
            iva,
            descuento
          } 
        });
      } else {
        setError(response.mensaje || 'Error al procesar el pago');
      }
    } catch (err) {
      console.error('Error al proceder con el pago:', err);
      setError('No se pudo procesar tu orden. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegresar = () => {
    navigate(-1);
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
                {/* Cuadro de Saldos */}
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
            ) : (
              <>
                <button
                  onClick={handleCancelarPedido}
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Cancelar Pedido
                </button>
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
          {/* Columna Izquierda - Opciones de acción */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
              {/* Agregar Producto */}
              <button
                onClick={handleAgregarProducto}
                className="w-full bg-gray-200 hover:bg-gray-300 rounded-3xl shadow-md hover:shadow-lg transition-all p-8 flex flex-col items-center gap-6"
              >
                {/* Imagen de taza con + */}
                <div className="w-48 h-48 bg-white rounded-3xl flex items-center justify-center border-4 border-gray-300 relative">
                  <img 
                    src={logo} 
                    alt="Agregar"
                    className="w-32 h-32 object-contain"
                  />
                  {/* Icono + */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                    <span className="text-white text-5xl font-bold leading-none">+</span>
                  </div>
                </div>
                <span className="text-3xl md:text-4xl font-semibold text-gray-800">
                  Agregar Producto
                </span>
              </button>

              {/* Proceder Pago */}
              <button
                onClick={handleProcederPago}
                disabled={loading}
                className={`w-full rounded-3xl shadow-md transition-all p-8 flex flex-col items-center gap-6 ${
                  loading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 hover:shadow-lg'
                }`}
              >
                {/* Imagen de taza con → */}
                <div className="w-48 h-48 bg-white rounded-3xl flex items-center justify-center border-4 border-gray-300 relative">
                  <img 
                    src={logo} 
                    alt="Proceder"
                    className="w-32 h-32 object-contain"
                  />
                  {/* Icono → */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-4 border-white">
                    <span className="text-white text-4xl font-bold leading-none">→</span>
                  </div>
                </div>
                <span className="text-3xl md:text-4xl font-semibold text-gray-800">
                  {loading ? 'Procesando...' : 'Proceder Pago'}
                </span>
              </button>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4">
                  <p className="text-lg text-red-700 text-center">{error}</p>
                </div>
              )}

              {/* Botón Regresar */}
              <div className="flex justify-start">
                <button
                  onClick={handleRegresar}
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-12 py-3 rounded-xl transition-colors"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Resumen del pedido */}
          <div className="w-80 md:w-96 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 sticky top-8">
              {/* Lista de productos en el carrito */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                    {/* Imagen pequeña */}
                    <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">{item.nombre}</h4>
                      <p className="text-base text-gray-600">${item.precio}</p>
                      {item.personalizacion && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.personalizacion.sabor && item.personalizacion.sabor !== 'Regular' && (
                            <span className="block">{item.personalizacion.sabor}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-bold text-xl flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-xl font-semibold text-gray-800 w-8 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-bold text-xl flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desglose */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-700">Iva:</span>
                  <span className="text-lg font-semibold text-gray-800">${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-700">Descuento:</span>
                  <span className="text-lg font-semibold text-gray-800">${descuento.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-700">Subtotal:</span>
                  <span className="text-lg font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                
                {/* Total en verde */}
                <div className="bg-green-500 rounded-xl p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">TOTAL:</span>
                    <span className="text-3xl font-bold text-white">${totalFinal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
