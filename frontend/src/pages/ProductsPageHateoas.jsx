import { useState, useEffect } from 'react';
import ProductService from '@/services/productService';

/**
 * ProductsPage - Ejemplo de uso de HATEOAS con paginación
 * Demuestra cómo consumir una API REST con HATEOAS desde React
 */
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [hateoasLinks, setHateoasLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Cargar productos de la API
   */
  const loadProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getAll(page, 10);
      
      // Extraer datos y enlaces HATEOAS
      setProducts(response.data);
      setPagination(response.pagination);
      setHateoasLinks(response._links);
      setCurrentPage(page);

      console.log('HATEOAS Links disponibles:', response._links);
      console.log('Paginación:', response.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Ir a la siguiente página usando enlace HATEOAS
   */
  const handleNextPage = async () => {
    if (!hateoasLinks?.next) return;
    
    try {
      const response = await ProductService.followLink(hateoasLinks.next);
      setProducts(response.data);
      setPagination(response.pagination);
      setHateoasLinks(response._links);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Ir a la página anterior usando enlace HATEOAS
   */
  const handlePrevPage = async () => {
    if (!hateoasLinks?.prev) return;
    
    try {
      const response = await ProductService.followLink(hateoasLinks.prev);
      setProducts(response.data);
      setPagination(response.pagination);
      setHateoasLinks(response._links);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Ir a la primera página usando enlace HATEOAS
   */
  const handleFirstPage = async () => {
    if (!hateoasLinks?.first) return;
    
    try {
      const response = await ProductService.followLink(hateoasLinks.first);
      setProducts(response.data);
      setPagination(response.pagination);
      setHateoasLinks(response._links);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Ir a la última página usando enlace HATEOAS
   */
  const handleLastPage = async () => {
    if (!hateoasLinks?.last) return;
    
    try {
      const response = await ProductService.followLink(hateoasLinks.last);
      setProducts(response.data);
      setPagination(response.pagination);
      setHateoasLinks(response._links);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Eliminar producto usando enlace HATEOAS
   */
  const handleDeleteProduct = async (product) => {
    if (!product._links?.delete) return;
    
    if (!window.confirm(`¿Eliminar "${product.name}"?`)) return;

    try {
      await ProductService.followLink(product._links.delete);
      // Recargar la página actual
      loadProducts(currentPage);
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts(1);
  }, []);

  return (
    <div className="products-container">
      <h1>Productos - Ejemplo HATEOAS</h1>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <>
          {/* Lista de Productos */}
          <div className="products-list">
            {products.length === 0 ? (
              <p>No hay productos disponibles</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        {/* Botón para ver detalles usando enlace HATEOAS */}
                        {product._links?.self && (
                          <button
                            onClick={() =>
                              window.location.href = product._links.self.href
                            }
                            className="btn-view"
                          >
                            Ver
                          </button>
                        )}

                        {/* Botón para editar usando enlace HATEOAS */}
                        {product._links?.update && (
                          <button
                            onClick={() =>
                              window.location.href = `${product._links.update.href}/edit`
                            }
                            className="btn-edit"
                          >
                            Editar
                          </button>
                        )}

                        {/* Botón para eliminar usando enlace HATEOAS */}
                        {product._links?.delete && (
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="btn-delete"
                          >
                            Eliminar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Información de Paginación */}
          {pagination && (
            <div className="pagination-info">
              <p>
                Página {pagination.page} de {pagination.pages} 
                (Total: {pagination.total} productos)
              </p>
            </div>
          )}

          {/* Controles de Paginación HATEOAS */}
          <div className="pagination-controls">
            {/* Botón Primera Página */}
            <button
              onClick={handleFirstPage}
              disabled={!hateoasLinks?.first}
              className="btn-pagination"
            >
              ⟨⟨ Primera
            </button>

            {/* Botón Página Anterior */}
            <button
              onClick={handlePrevPage}
              disabled={!hateoasLinks?.prev}
              className="btn-pagination"
            >
              ⟨ Anterior
            </button>

            {/* Número de Página */}
            {pagination && (
              <span className="page-number">
                Página {pagination.page}
              </span>
            )}

            {/* Botón Página Siguiente */}
            <button
              onClick={handleNextPage}
              disabled={!hateoasLinks?.next}
              className="btn-pagination"
            >
              Siguiente ⟩
            </button>

            {/* Botón Última Página */}
            <button
              onClick={handleLastPage}
              disabled={!hateoasLinks?.last}
              className="btn-pagination"
            >
              Última ⟩⟩
            </button>
          </div>

          {/* Botón para Crear Nuevo Producto */}
          {hateoasLinks?.create && (
            <div className="create-product-section">
              <button
                onClick={() =>
                  window.location.href = `${hateoasLinks.create.href}/new`
                }
                className="btn-create"
              >
                + Crear Nuevo Producto
              </button>
            </div>
          )}

          {/* Debug: Mostrar enlaces HATEOAS */}
          <details className="debug-info">
            <summary>Información HATEOAS (Debug)</summary>
            <pre>{JSON.stringify(hateoasLinks, null, 2)}</pre>
          </details>
        </>
      )}

      <style jsx>{`
        .products-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .error-message {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .loading {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
        }

        .products-list {
          margin: 20px 0;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        thead {
          background-color: #f8f9fa;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        th {
          font-weight: 600;
          background-color: #f8f9fa;
        }

        tbody tr:hover {
          background-color: #f8f9fa;
        }

        .btn-view, .btn-edit, .btn-delete, .btn-pagination, .btn-create {
          padding: 6px 12px;
          margin: 0 4px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .btn-view {
          background-color: #007bff;
          color: white;
        }

        .btn-view:hover {
          background-color: #0056b3;
        }

        .btn-edit {
          background-color: #28a745;
          color: white;
        }

        .btn-edit:hover {
          background-color: #1e7e34;
        }

        .btn-delete {
          background-color: #dc3545;
          color: white;
        }

        .btn-delete:hover {
          background-color: #c82333;
        }

        .btn-pagination {
          background-color: #6c757d;
          color: white;
        }

        .btn-pagination:hover:not(:disabled) {
          background-color: #5a6268;
        }

        .btn-pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-create {
          background-color: #20c997;
          color: white;
          font-weight: 600;
          padding: 10px 20px;
          font-size: 16px;
        }

        .btn-create:hover {
          background-color: #1aa179;
        }

        .pagination-info {
          text-align: center;
          padding: 20px;
          background-color: #e7f3ff;
          border: 1px solid #b3d9ff;
          border-radius: 4px;
          margin: 20px 0;
        }

        .pagination-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .page-number {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          background-color: #e9ecef;
          border-radius: 4px;
          font-weight: 600;
        }

        .create-product-section {
          text-align: center;
          padding: 20px;
          margin: 20px 0;
        }

        .debug-info {
          margin-top: 40px;
          padding: 20px;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .debug-info summary {
          cursor: pointer;
          font-weight: 600;
          color: #666;
        }

        .debug-info pre {
          background-color: #fff;
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

/**
 * CONCEPTOS CLAVE DEMOSTRATOS:
 * 
 * 1. HATEOAS Links - Cada recurso incluye enlaces a acciones disponibles
 * 2. Paginación dinámica - Usando enlaces en lugar de construir URLs
 * 3. Seguir enlaces - followLink() permite usar el método HTTP adecuado
 * 4. Navegación discoverability - El cliente descubre páginas siguiente/anterior
 * 5. Desacoplamiento - El cliente no conoce la estructura de URLs
 */
