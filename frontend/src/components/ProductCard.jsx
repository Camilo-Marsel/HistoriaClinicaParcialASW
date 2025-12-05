import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>${product.price.toFixed(2)}</p>
      <p style={styles.stock}>Stock: {product.stock}</p>
      <div style={styles.actions}>
        {onEdit && (
          <button
            style={{ ...styles.button, ...styles.editButton }}
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            onClick={() => onDelete(product._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  description: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#666',
  },
  price: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  stock: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#666',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
};

export default ProductCard;
