import React, { useState } from "react";
import "../css/CreatePage.css";
import { addProduct } from "../store/product";
import { toast } from "react-toastify";
function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleNameChange = (e) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };
  const handlePriceChange = (e) => {
    setNewProduct({ ...newProduct, price: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.value });
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const savedProduct = await addProduct(newProduct);
      if (savedProduct) {
        toast.success("Product added successfully!");
        console.log("Product added successfuly: ", savedProduct);
      }
      // reset form after success
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    } catch (error) {
      toast.error("Something went wrong!")
      console.error("Could not add product: ", error);
    }
    // console.log(newProduct);
  };
  return (
    <section className="create-page">
      <div className="card-page">
        <h1>Create New Product</h1>
        <form action="">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            placeholder="Product Name"
            onChange={handleNameChange}
            required
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            placeholder="Price"
            onChange={handlePriceChange}
            required
          />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            placeholder="Image Url"
            onChange={handleImageChange}
            required
          />

          <button onClick={handleAddProduct}>Add Product</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePage;
