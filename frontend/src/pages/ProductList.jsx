import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductosPorCategoria, getProductosPorSubcategoria } from '../services/api';
import logo from '@assets/images/logo.png';

function ProductList() {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  const { user, isAuthenticated, logout } = useAuth();
  const { items, total, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo de nombres de categorías
  const categoryNames = {
    '1': 'Calientes',
    '2': 'Fríos',
    '3': 'Alimentos',
    'nieve': 'Nieve',
    'reposteria': 'Repostería'
  };

  useEffect(() => {
    loadProductos();
  }, [categoryId, subcategoryId]);

  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (categoryId === '4' && subcategoryId) {
        // Cargar productos de subcategoría de Dulces
        data = await getProductosPorSubcategoria(subcategoryId);
        setCategoryName(categoryNames[subcategoryId] || 'Dulces');
      } else {
        // Cargar productos de categoría normal
        data = await getProductosPorCategoria(categoryId);
        setCategoryName(categoryNames[categoryId] || 'Categoría');
      }

      // Mapear productos del backend al formato del frontend
      const productosFormateados = data.map(p => ({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        imagen: logo, // Por ahora usar logo, después se usarán las imágenes reales
        disponible: p.isAvailable
      }));

      setProductos(productosFormateados);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleProductClick = (producto) => {
    // Si es Calientes (1) o Fríos (2), navegar a personalización
    if (categoryId === '1' || categoryId === '2') {
      navigate(`/category/${categoryId}/product/customize`, {
        state: { producto }
      });
    } else {
      // Para otras categorías, agregar directamente al carrito
      addItem(producto);
    }
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
          {/* Columna Izquierda - Lista de Productos */}
          <div className="flex-1">
            {/* Título de Categoría */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-2">
                {categoryName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700">
                Selecciona tu favorito de hoy
              </p>
            </div>

            {/* Lista de Productos */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-gray-600">Cargando productos...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-red-600">{error}</p>
                  <button
                    onClick={loadProductos}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              ) : productos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-gray-600">No hay productos en esta categoría</p>
                </div>
              ) : (
                productos.map((producto) => (
                  <button
                    key={producto.id}
                    onClick={() => handleProductClick(producto)}
                    disabled={!producto.disponible}
                    className={`w-full rounded-3xl shadow-md transition-all p-6 md:p-8 flex items-center gap-6 md:gap-8 text-left ${
                      producto.disponible
                        ? 'bg-white hover:bg-gray-50 hover:shadow-lg'
                        : 'bg-gray-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Imagen del Producto */}
                    <div className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex-shrink-0 flex items-center justify-center overflow-hidden border-4 ${
                      producto.disponible ? 'border-gray-300' : 'border-gray-400'
                    }`}>
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className={`w-full h-full object-contain p-2 ${
                          !producto.disponible ? 'grayscale' : ''
                        }`}
                        onError={(e) => {
                          e.target.src = '/assets/images/logo.png';
                        }}
                      />
                    </div>

                    {/* Info del Producto */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                        {producto.nombre}
                        {!producto.disponible && (
                          <span className="ml-3 text-lg text-red-600">(No disponible)</span>
                        )}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-2">
                        {producto.descripcion}
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-gray-800">
                        ${producto.precio}
                      </p>
                      {!producto.disponible && (
                        <p className="text-base text-red-600 mt-2 font-medium">
                          Este producto no se encuentra disponible en este momento
                        </p>
                      )}
                    </div>
                  </button>
                ))
              )}
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
                    <button
                      key={item.id}
                      onClick={() => {
                        // Si el producto es personalizable (Calientes o Fríos), navegar a editar
                        const originalCategoryId = item.id.toString().split('-')[0];
                        if (originalCategoryId === '1' || originalCategoryId === '2' || 
                            (item.personalizacion && (categoryId === '1' || categoryId === '2'))) {
                          navigate(`/category/${categoryId}/product/customize`, {
                            state: { 
                              producto: item,
                              isEditing: true,
                              itemId: item.id
                            }
                          });
                        }
                      }}
                      className="w-full flex items-center gap-4 pb-4 border-b border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors text-left"
                    >
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
                      </div>

                      {/* Cantidad */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
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
                    </button>
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

export default ProductList;
