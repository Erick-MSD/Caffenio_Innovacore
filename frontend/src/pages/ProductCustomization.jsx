import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '@assets/images/logo.png';

function ProductCustomization() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { items, total, addItem, updateQuantity, removeItem, clearCart } = useCart();
  
  // Producto que se está personalizando
  const producto = location.state?.producto;
  const isEditing = location.state?.isEditing;
  const editingItemId = location.state?.itemId;

  // Estados de personalización - cargar valores si está editando
  const [tamaño, setTamaño] = useState(
    isEditing && producto?.personalizacion?.tamaño ? producto.personalizacion.tamaño : 'Jumbo'
  );
  const [tipoGrano, setTipoGrano] = useState(
    isEditing && producto?.personalizacion?.tipoGrano ? producto.personalizacion.tipoGrano : 'Regular'
  );
  const [sabor, setSabor] = useState(
    isEditing && producto?.personalizacion?.sabor ? producto.personalizacion.sabor : 'Regular'
  );
  const [tipoLeche, setTipoLeche] = useState(
    isEditing && producto?.personalizacion?.tipoLeche ? producto.personalizacion.tipoLeche : 'Entera'
  );
  
  // Cargar toppings si está editando
  const loadToppings = () => {
    if (isEditing && producto?.personalizacion?.toppings) {
      const toppingsObj = {
        avellana: 0,
        azucar: 0,
        canela: 0,
        mascabado: 0,
        shot: 0,
        splenda: 0
      };
      producto.personalizacion.toppings.forEach(t => {
        toppingsObj[t.nombre] = t.cantidad;
      });
      return toppingsObj;
    }
    return {
      avellana: 0,
      azucar: 0,
      canela: 0,
      mascabado: 0,
      shot: 0,
      splenda: 0
    };
  };

  const [toppings, setToppings] = useState(loadToppings());

  // Precios de toppings y leches especiales
  const preciosLeche = {
    'Entera': 0,
    'Light': 0,
    'Deslactosada': 0,
    'Soya': 7,
    'Coco': 10,
    'Almendras': 10
  };

  const preciosToppings = {
    avellana: 0,
    azucar: 0,
    canela: 0,
    mascabado: 0,
    shot: 9,
    splenda: 0
  };

  const tamañosInfo = {
    'Chico': { ml: 360, oz: 12 },
    'Jumbo': { ml: 960, oz: 32 },
    'Refill': { ml: 0, oz: 0 }
  };

  // Calcular precio total del producto personalizado
  const calcularPrecioTotal = () => {
    let precio = producto?.precio || 0;
    
    // Agregar precio de leche especial
    precio += preciosLeche[tipoLeche] || 0;
    
    // Agregar precio de toppings
    Object.keys(toppings).forEach(topping => {
      if (toppings[topping] > 0) {
        precio += (preciosToppings[topping] || 0) * toppings[topping];
      }
    });
    
    return precio;
  };

  const handleToppingChange = (topping, delta) => {
    setToppings(prev => ({
      ...prev,
      [topping]: Math.max(0, (prev[topping] || 0) + delta)
    }));
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

  const handleRegresar = () => {
    navigate(-1);
  };

  const handleAgregar = () => {
    // Si está editando, remover el producto anterior
    if (isEditing && editingItemId) {
      removeItem(editingItemId);
    }

    // Crear producto personalizado con un ID único
    const productoPersonalizado = {
      ...producto,
      id: isEditing ? editingItemId : `${producto.id}-${Date.now()}`,
      precio: calcularPrecioTotal(),
      personalizacion: {
        tamaño,
        tipoGrano,
        sabor,
        tipoLeche,
        toppings: Object.entries(toppings)
          .filter(([_, cantidad]) => cantidad > 0)
          .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      }
    };

    addItem(productoPersonalizado);
    navigate(-1);
  };

  if (!producto) {
    navigate(-1);
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
          {/* Columna Izquierda - Personalización */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-2">
                {producto.nombre}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-2">
                Selecciona tu favorito de hoy
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                Precio base: ${producto.precio}
              </p>
            </div>

            {/* Tamaño */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 bg-gray-300 px-4 py-2 rounded-lg">
                Tamaño:
              </h2>
              <div className="flex gap-4">
                {['Chico', 'Jumbo', 'Refill'].map((tam) => (
                  <button
                    key={tam}
                    onClick={() => setTamaño(tam)}
                    className={`flex-1 rounded-2xl p-6 transition-all ${
                      tamaño === tam
                        ? 'bg-white border-4 border-gray-800 shadow-lg'
                        : 'bg-gray-200 border-4 border-transparent'
                    }`}
                  >
                    <div className="w-full aspect-square bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
                      {/* Icono de taza */}
                      <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg text-gray-800">{tam}</div>
                      {tam !== 'Refill' && (
                        <div className="text-sm text-gray-600">
                          {tamañosInfo[tam].ml} ML<br />{tamañosInfo[tam].oz} OZ
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de grano */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 bg-gray-300 px-4 py-2 rounded-lg">
                Tipo de grano:
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setTipoGrano('Regular')}
                  className={`flex-1 rounded-2xl p-6 transition-all ${
                    tipoGrano === 'Regular'
                      ? 'bg-white border-4 border-gray-800 shadow-lg'
                      : 'bg-gray-200 border-4 border-transparent'
                  }`}
                >
                  <div className="w-full aspect-square bg-red-100 rounded-xl mb-3 flex items-center justify-center">
                    {/* Icono de granos de café rojos */}
                    <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <ellipse cx="8" cy="10" rx="4" ry="6" transform="rotate(-20 8 10)" />
                      <ellipse cx="16" cy="10" rx="4" ry="6" transform="rotate(20 16 10)" />
                    </svg>
                  </div>
                  <div className="text-center font-semibold text-lg text-gray-800">Regular</div>
                </button>
                <button
                  onClick={() => setTipoGrano('Descafeinado')}
                  className={`flex-1 rounded-2xl p-6 transition-all ${
                    tipoGrano === 'Descafeinado'
                      ? 'bg-white border-4 border-gray-800 shadow-lg'
                      : 'bg-gray-200 border-4 border-transparent'
                  }`}
                >
                  <div className="w-full aspect-square bg-green-100 rounded-xl mb-3 flex items-center justify-center">
                    {/* Icono de granos de café verdes */}
                    <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <ellipse cx="8" cy="10" rx="4" ry="6" transform="rotate(-20 8 10)" />
                      <ellipse cx="16" cy="10" rx="4" ry="6" transform="rotate(20 16 10)" />
                    </svg>
                  </div>
                  <div className="text-center font-semibold text-lg text-gray-800">Descafeinado</div>
                </button>
              </div>
            </div>

            {/* Sabor */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 bg-gray-300 px-4 py-2 rounded-lg">
                Sabor:
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  'Avellana',
                  'Crema Irlandesa',
                  'Vainilla',
                  'Moka Blanco',
                  'Regular',
                  'Moka',
                  'Caramelo'
                ].map((sab) => (
                  <button
                    key={sab}
                    onClick={() => setSabor(sab)}
                    className={`rounded-2xl p-4 transition-all ${
                      sabor === sab
                        ? 'bg-white border-4 border-gray-800 shadow-lg'
                        : 'bg-gray-200 border-4 border-transparent'
                    }`}
                  >
                    <div className="w-full aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                      {/* Icono de café */}
                      <svg className="w-12 h-12 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
                      </svg>
                    </div>
                    <div className="text-center font-medium text-sm text-gray-800">
                      {sab}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de leche */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 bg-gray-300 px-4 py-2 rounded-lg">
                Tipo de leche:
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { nombre: 'Entera', precio: 0 },
                  { nombre: 'Light', precio: 0 },
                  { nombre: 'Deslactosada', precio: 0 },
                  { nombre: 'Soya', precio: 7 },
                  { nombre: 'Coco', precio: 10 },
                  { nombre: 'Almendras', precio: 10 }
                ].map((leche) => (
                  <button
                    key={leche.nombre}
                    onClick={() => setTipoLeche(leche.nombre)}
                    className={`rounded-2xl p-4 transition-all ${
                      tipoLeche === leche.nombre
                        ? 'bg-white border-4 border-gray-800 shadow-lg'
                        : 'bg-gray-200 border-4 border-transparent'
                    }`}
                  >
                    <div className="w-full aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                      {/* Icono de botella de leche */}
                      <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4,22H20V20H4V22M9,3V4H15V3H9M5,6V7H19V6H5M5,11A2,2 0 0,0 7,13H17A2,2 0 0,0 19,11V8H5V11Z" />
                      </svg>
                      {leche.nombre === 'Soya' && (
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full"></div>
                      )}
                      {(leche.nombre === 'Coco' || leche.nombre === 'Almendras') && (
                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-yellow-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm text-gray-800">{leche.nombre}</div>
                      {leche.precio > 0 && (
                        <div className="text-xs text-red-600">+${leche.precio}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 bg-gray-300 px-4 py-2 rounded-lg">
                Toppings:
              </h2>
              <div className="bg-white rounded-2xl p-6 space-y-4">
                {[
                  { key: 'avellana', nombre: 'Avellana', precio: 0 },
                  { key: 'azucar', nombre: 'Azúcar', precio: 0 },
                  { key: 'canela', nombre: 'Canela', precio: 0 },
                  { key: 'mascabado', nombre: 'Mascabado', precio: 0 },
                  { key: 'shot', nombre: 'Shot', precio: 9 },
                  { key: 'splenda', nombre: 'Splenda', precio: 0 }
                ].map((topping) => (
                  <div key={topping.key} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <span className="text-lg font-medium text-gray-800">{topping.nombre}</span>
                      {topping.precio > 0 && (
                        <span className="text-sm text-red-600 ml-2">(+${topping.precio})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToppingChange(topping.key, -1)}
                        className="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 font-bold text-2xl flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-xl font-semibold text-gray-800 w-8 text-center">
                        {toppings[topping.key]}
                      </span>
                      <button
                        onClick={() => handleToppingChange(topping.key, 1)}
                        className="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 font-bold text-2xl flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Regresar */}
            <div className="mb-8">
              <button
                onClick={handleRegresar}
                className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-12 py-3 rounded-xl transition-colors"
              >
                Regresar
              </button>
            </div>
          </div>

          {/* Columna Derecha - Pedido/Carrito */}
          <div className="w-80 md:w-96 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 sticky top-8">
              {/* Imagen del producto siendo personalizado */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center border-4 border-gray-300 overflow-hidden">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              {/* Título del panel */}
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
                Tu Pedido
              </h2>

              {/* Contenido del carrito */}
              {items.length === 0 ? (
                <div className="min-h-[200px] flex flex-col items-center justify-center">
                  <p className="text-xl md:text-2xl font-bold text-gray-400 text-center">
                    Agrega productos
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
                  {items.map((item) => {
                    // Determinar si el producto es editable (tiene personalización)
                    const isEditable = item.personalizacion !== undefined;
                    
                    return (
                      <button
                        key={item.id}
                        disabled={!isEditable}
                        onClick={() => {
                          if (isEditable) {
                            // Navegar a personalización para editar
                            const baseCategoryId = item.id.toString().split('-')[0];
                            navigate(`/category/${baseCategoryId}/product/customize`, {
                              state: { 
                                producto: item,
                                isEditing: true,
                                itemId: item.id
                              }
                            });
                          }
                        }}
                        className={`w-full flex items-center gap-4 pb-4 border-b border-gray-200 rounded-lg p-2 transition-colors text-left ${
                          isEditable ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-default'
                        }`}
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
                          {isEditable && (
                            <p className="text-xs text-blue-600 mt-1">Click para editar</p>
                          )}
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
                    );
                  })}
                </div>
              )}

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl md:text-2xl font-medium text-gray-700">Total:</span>
                  <span className="text-2xl md:text-3xl font-bold text-gray-800">${total}</span>
                </div>
                
                {/* Botón Agregar - Verde grande */}
                <button
                  onClick={handleAgregar}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl text-lg md:text-xl transition-colors mb-3"
                >
                  {isEditing ? 'Actualizar' : 'Agregar'}
                </button>

                {/* Precio del producto personalizado */}
                <div className="text-center text-lg text-gray-600">
                  Precio: <span className="font-bold text-gray-800">${calcularPrecioTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCustomization;
