import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('caffenio_cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      setItems(cartData);
      calculateTotal(cartData);
    }
  }, []);

  useEffect(() => {
    // Guardar carrito en localStorage cuando cambia
    localStorage.setItem('caffenio_cart', JSON.stringify(items));
    calculateTotal(items);
  }, [items]);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setTotal(sum);
  };

  const addItem = (producto) => {
    const existingItem = items.find(item => item.id === producto.id);
    
    if (existingItem) {
      // Incrementar cantidad si ya existe
      setItems(items.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Agregar nuevo producto
      setItems([...items, { ...producto, cantidad: 1 }]);
    }
  };

  const removeItem = (productoId) => {
    setItems(items.filter(item => item.id !== productoId));
  };

  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeItem(productoId);
    } else {
      setItems(items.map(item =>
        item.id === productoId
          ? { ...item, cantidad }
          : item
      ));
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
    localStorage.removeItem('caffenio_cart');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      total, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      itemCount: items.reduce((acc, item) => acc + item.cantidad, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
