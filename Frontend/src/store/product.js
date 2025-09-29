export const addProduct  = async (productData)=>{
    try {
        const response = await fetch("http://localhost:5000/api/products",{
            method:"Post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(productData)
        })

        if (!response.ok){
            throw new Error("Failed to add product")
        }
        const data =await response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error
    }

}