import axiosInstance from "./axiosConfig";

export const getProducts = async() => { 
    try { 
        const response = await axiosInstance.get("/product")
        return response.data.products 
    } catch (error ) { 
        console.error('Error fetching products. Error: ',error)
        throw error
    }
}


export const getProductById = async(id) => { 
    try { 
        const response = await axiosInstance.get(`/product/${id}`)
        return response.data.product
    } catch (error ) { 
        console.error(`Error fetching product by id ${id}. Error: `,error)
        throw error
    }
}
