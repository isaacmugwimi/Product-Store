async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
     
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting product: " + error.message);
    throw error;
    
  }
}

export default deleteProduct;
