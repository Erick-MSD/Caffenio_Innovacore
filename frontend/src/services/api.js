const API_BASE_URL = 'http://localhost:5000/api';

// Header simple para seguridad básica
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Api-Key': 'caffenio-2024-frontend-key' // Seguridad básica
});

// Función helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ mensaje: 'Error en la solicitud' }));
    throw new Error(error.mensaje || 'Error en la solicitud');
  }
  return response.json();
};

// ============ PRODUCTOS ============

export const getProductos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductosPorCategoria = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/categoria/${categoryId}`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};

export const getProductosPorSubcategoria = async (subcategoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/categoria/4/subcategoria/${subcategoryId}`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener productos por subcategoría:', error);
    throw error;
  }
};

export const getDisponibilidadProducto = async (productoId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${productoId}/disponibilidad`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
};

// ============ ÓRDENES ============

export const crearOrden = async (ordenData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ordenes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ordenData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear orden:', error);
    throw error;
  }
};

export const getOrdenes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ordenes`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

export const getOrdenPorTicket = async (numeroTicket) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ordenes/ticket/${numeroTicket}`, {
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener orden:', error);
    throw error;
  }
};

export const actualizarEstadoOrden = async (ordenId, estado) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ordenes/${ordenId}/estado`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ estado })
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    throw error;
  }
};
