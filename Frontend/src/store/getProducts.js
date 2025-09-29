
const getProducts = async () => {
 try {
    const response = await fetch("http://localhost:5000/api/products")
    if(!response.ok){
        throw new Error("Failed to fetch products");
        
    }
    const data = await response.json()
    return data

    
 } catch (error) {
    console.error(error);
    throw error
    
 }
}

export default getProducts




