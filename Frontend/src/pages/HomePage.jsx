import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import { Link } from "react-router-dom";
import getProducts from "../store/getProducts";
import { updateProduct } from "../store/updateProduct";
import deleteProduct from "../store/deleteProduct";
import { toast } from "react-toastify";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // for modal update
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log("fetched products are: ", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // When edit icon is clicked
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // handle update form submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.id, editingProduct); // API call
      setProducts((prev) => {
        return prev.map((p) => {
          return p.id === editingProduct.id ? editingProduct : p;
        });
      });
      setEditingProduct(null);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // function to handle delete
  const handleDelete = async (id) => {
    let response = confirm("Are you sure you want to delete this item?");
    if (response) {
      try {
        await deleteProduct(id); // API CALL
        // remove from state
        setProducts((prev) => {
          return prev.filter((p) => p.id !== id);
        });
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete: ", error.message);
      }
    }
  };

  return (
    <section>
      <p className="page-header">Current Products</p>
      <section className="product-section">
        {/* loading the page  */}
        {loading ? <p>Loading...</p> : null}

        {/* If no products and not loading we do this */}
        {!loading && Array.isArray(products) && products.length === 0 ? (
          <p>
            No products found😥{" "}
            <Link to="/create" className="create-product-link">
              Create a product{" "}
            </Link>{" "}
          </p>
        ) : null}

        {/* if not loading and the products are there we do this condition */}
        {!loading && Array.isArray(products) && products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="card-info">
                  {" "}
                  <h3>{product.name}</h3>
                  <p className="price-name">Ksh. {product.price}</p>
                </div>
                <div className="update-delete-icons">
                  <img
                    src="/edit.svg"
                    alt=""
                    onClick={() => handleEditClick(product)}
                  />
                  <img
                    src="/trash-2.svg"
                    alt=""
                    onClick={() => {
                      return handleDelete(product.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      {/* ---- Modal Update ---- */}
      {editingProduct ? (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                placeholder="Price"
              />
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Image Url"
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Homepage;
