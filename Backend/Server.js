import express, { response } from "express";
import cors from "cors";
import path from "path"; //step 1
import { fileURLToPath } from "url";  
import productRoutes from "./routes/product.route.js";
import { request } from "http";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

//
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename) // step 2
//
// ---------- Middleware ----------
app.use(express.json()); // allows us to accept JSON data in the request.body
//
//
app.use("/api/products", productRoutes);
if (process.env.NODE_ENV === "production") {
  //step 3
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get(/.*/, (request, response)=>{
    response.sendFile(path.resolve(__dirname,"../Frontend", "dist","index.html"))
  })
}

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log("Server started at http://localhost: " + PORT);
});
