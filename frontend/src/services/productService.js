import apiClient from './apiClient';
import hateoasApiClient from './hateoasApiClient';

const ProductService = {
  /**
   * Get all products with pagination support
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Response with data and HATEOAS links
   */
  getAll: async (page = 1, limit = 10) => {
    try {
      const response = await hateoasApiClient.getProducts(page, limit);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   */
  getById: async (id) => {
    try {
      const response = await hateoasApiClient.getProductById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Create new product
   * @param {Object} productData - Product data
   */
  create: async (productData) => {
    try {
      const response = await hateoasApiClient.createProduct(productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Update product
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product data
   */
  update: async (id, productData) => {
    try {
      const response = await hateoasApiClient.updateProduct(id, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  /**
   * Delete product
   * @param {string} id - Product ID
   */
  delete: async (id) => {
    try {
      const response = await hateoasApiClient.deleteProduct(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  /**
   * Get next page using HATEOAS link
   * @param {Object} response - Previous response with HATEOAS links
   */
  getNextPage: async (response) => {
    try {
      return await hateoasApiClient.getNextPage(response);
    } catch (error) {
      console.error('Error getting next page:', error);
      throw error;
    }
  },

  /**
   * Get previous page using HATEOAS link
   * @param {Object} response - Previous response with HATEOAS links
   */
  getPrevPage: async (response) => {
    try {
      return await hateoasApiClient.getPrevPage(response);
    } catch (error) {
      console.error('Error getting previous page:', error);
      throw error;
    }
  },

  /**
   * Follow a HATEOAS link
   * @param {Object} link - HATEOAS link object
   * @param {Object} data - Data for POST/PUT requests
   */
  followLink: async (link, data = null) => {
    try {
      return await hateoasApiClient.followLink(link, data);
    } catch (error) {
      console.error('Error following link:', error);
      throw error;
    }
  },
};

export default ProductService;
