import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import ProductService from '../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAll();
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (formData) => {
    try {
      await ProductService.create(formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      await ProductService.update(editingProduct._id, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductService.delete(id);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error(err);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.pageTitle}>
          {editingProduct ? 'Edit Product' : 'Create Product'}
        </h2>

        {error && <div style={styles.error}>{error}</div>}

        <ProductForm
          onSubmit={
            editingProduct ? handleUpdateProduct : handleCreateProduct
          }
          initialData={editingProduct}
          loading={loading}
        />

        {editingProduct && (
          <button
            onClick={handleCancel}
            style={{
              ...styles.cancelButton,
              marginBottom: '32px',
            }}
          >
            Cancel Edit
          </button>
        )}

        <h2 style={styles.pageTitle}>Products List</h2>

        {loading && !editingProduct && (
          <div style={styles.loading}>Loading products...</div>
        )}

        {!loading && products.length === 0 && (
          <div style={styles.empty}>No products available. Create one to get started!</div>
        )}

        {products.length > 0 && (
          <div style={styles.productsList}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f5f5f5',
    minHeight: 'calc(100vh - 120px)',
    padding: '32px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#2c3e50',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  loading: {
    textAlign: 'center',
    padding: '32px',
    fontSize: '16px',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '32px',
    fontSize: '16px',
    color: '#999',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  productsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  cancelButton: {
    padding: '10px 16px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default ProductsPage;
