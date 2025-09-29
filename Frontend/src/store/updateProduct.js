export const updateProduct = async (id, product) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error(`Failed to update product: ${res.status}`);
  }

  return await res.json();
};
