/**
 * apiClient.js - Cliente API con soporte HATEOAS
 * Proporciona métodos para consumir la API REST con HATEOAS
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class HateoasApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  /**
   * Realizar una solicitud GET
   * @param {string} url - URL a la que hacer la solicitud
   * @param {Object} options - Opciones adicionales
   */
  async get(url, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  /**
   * Realizar una solicitud POST
   * @param {string} url - URL a la que hacer la solicitud
   * @param {Object} data - Datos a enviar
   * @param {Object} options - Opciones adicionales
   */
  async post(url, data, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  /**
   * Realizar una solicitud PUT
   * @param {string} url - URL a la que hacer la solicitud
   * @param {Object} data - Datos a enviar
   * @param {Object} options - Opciones adicionales
   */
  async put(url, data, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  /**
   * Realizar una solicitud DELETE
   * @param {string} url - URL a la que hacer la solicitud
   * @param {Object} options - Opciones adicionales
   */
  async delete(url, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  /**
   * Seguir un enlace HATEOAS
   * @param {Object} link - Objeto enlace HATEOAS
   * @param {Object} data - Datos para POST/PUT (opcional)
   */
  async followLink(link, data = null) {
    if (!link || !link.href) {
      throw new Error('Invalid HATEOAS link');
    }

    const method = link.method || 'GET';
    const url = link.href.replace(this.baseUrl, '');

    switch (method.toUpperCase()) {
      case 'GET':
        return this.get(url);
      case 'POST':
        return this.post(url, data);
      case 'PUT':
        return this.put(url, data);
      case 'DELETE':
        return this.delete(url);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  /**
   * Obtener productos con paginación
   * @param {number} page - Número de página
   * @param {number} limit - Elementos por página
   */
  async getProducts(page = 1, limit = 10) {
    return this.get(`/products?page=${page}&limit=${limit}`);
  }

  /**
   * Obtener un producto por ID
   * @param {string} productId - ID del producto
   */
  async getProductById(productId) {
    return this.get(`/products/${productId}`);
  }

  /**
   * Crear un nuevo producto
   * @param {Object} productData - Datos del producto
   */
  async createProduct(productData) {
    return this.post('/products', productData);
  }

  /**
   * Actualizar un producto
   * @param {string} productId - ID del producto
   * @param {Object} productData - Datos a actualizar
   */
  async updateProduct(productId, productData) {
    return this.put(`/products/${productId}`, productData);
  }

  /**
   * Eliminar un producto
   * @param {string} productId - ID del producto
   */
  async deleteProduct(productId) {
    return this.delete(`/products/${productId}`);
  }

  /**
   * Obtener la siguiente página de una colección
   * @param {Object} response - Respuesta anterior con HATEOAS
   */
  async getNextPage(response) {
    if (response._links && response._links.next) {
      return this.followLink(response._links.next);
    }
    throw new Error('No next page available');
  }

  /**
   * Obtener la página anterior de una colección
   * @param {Object} response - Respuesta anterior con HATEOAS
   */
  async getPrevPage(response) {
    if (response._links && response._links.prev) {
      return this.followLink(response._links.prev);
    }
    throw new Error('No previous page available');
  }

  /**
   * Obtener la primera página de una colección
   * @param {Object} response - Respuesta anterior con HATEOAS
   */
  async getFirstPage(response) {
    if (response._links && response._links.first) {
      return this.followLink(response._links.first);
    }
    throw new Error('No first page link available');
  }

  /**
   * Obtener la última página de una colección
   * @param {Object} response - Respuesta anterior con HATEOAS
   */
  async getLastPage(response) {
    if (response._links && response._links.last) {
      return this.followLink(response._links.last);
    }
    throw new Error('No last page link available');
  }
}

// Exportar instancia única del cliente
export default new HateoasApiClient();

/**
 * EJEMPLOS DE USO EN COMPONENTES REACT
 * 
 * import apiClient from '@/services/apiClient';
 * 
 * // Obtener productos
 * const response = await apiClient.getProducts(1, 10);
 * console.log(response.data);           // Array de productos
 * console.log(response._links);          // Enlaces HATEOAS de colección
 * console.log(response.pagination);     // Información de paginación
 * 
 * // Obtener siguiente página
 * const nextPage = await apiClient.getNextPage(response);
 * 
 * // Crear producto usando enlace HATEOAS
 * const createLink = response._links.create;
 * const newProduct = await apiClient.followLink(createLink, {
 *   name: 'Nuevo producto',
 *   price: 99.99
 * });
 * 
 * // Acceder a enlaces de recursos individuales
 * const product = response.data[0];
 * const updatedProduct = await apiClient.followLink(product._links.update, {
 *   price: 149.99
 * });
 * 
 * // Eliminar usando enlace HATEOAS
 * await apiClient.followLink(product._links.delete);
 */
