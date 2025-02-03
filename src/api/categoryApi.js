import axiosInstance from "./axiosConfig";

export const getCategories = async() => { 
    try { 
        const response = await axiosInstance.get("/category")
        return response.data.cateogories
    } catch (error) { 
        console.error('Error fetching categories:',error)
        throw error
    }
}

export const getCategoryById = async(id) => { 
    try { 
        const response = await axiosInstance.get(`/category/${id}`)
        return response.data.category 
    } catch (error) { 
        console.error(`Error fetching ccategory by id ${id}. Error: `,error)
        throw error 
    }
}