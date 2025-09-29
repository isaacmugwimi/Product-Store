import { mysqlPool } from "../Config/db.js";

export const getProducts = async (request, response) => {
  try {
    console.log("Fetching product details...");
    const [rows] = await mysqlPool.query("SELECT * FROM products");

    response.status(200).json(rows);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Server error while fetching products." });
  }
};

export const createProduct = async (request, response) => {
  try {
    const { name, price, image } = request.body;
    //
    //.... validate input fields here
    //
    if (!name || !price || !image) {
      return response.status(400).json({
        message: " All fields (name, price, image) are required.",
      });
    }

    //
    //
    if (isNaN(price) || Number(price) <= 0) {
      return response.status(400).json({
        message: " Price must be a positive number.",
      });
    }

    const [results] = await mysqlPool.query(
      "INSERT INTO products (name, price, image) VALUES(?, ?, ?)",
      [name, price, image]
    );

    response.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server Error while creating the product.",
    });
  }
};
export const updateProduct = async (request, response) => {
  const { id } = request.params;
  const productId = Number(id);

  try {
    if (!productId) {
      return response.status(400).json({ message: "Invalid product id" });
    }

    const { name, price, image } = request.body;
    //  Validate body fields
    if (!name || !price || !image) {
      return response.status(400).json({ message: "All fields are required!" });
    }

    const [results] = await mysqlPool.query(
      "UPDATE products SET name = ?, price = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, price, image, productId]
    );
    if (results.affectedRows === 0) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.status(200).json({ message: "Products updated successfully." });

    //
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Server error while updating the products" });
  }
};
export const deleteProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const productId = Number(id);

    if (!productId) {
      return response.status(400).json({ message: "Invalid product id" });
    }

    const [results] = await mysqlPool.query(
      "DELETE FROM products WHERE id = ?",
      [productId]
    );

    if (results.affectedRows === 0) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Server Error while deleting the product" });
  }
};
