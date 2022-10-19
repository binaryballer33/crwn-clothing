import { useState, createContext, useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";


export const ProductsContext = createContext({
    products: [],
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    // when you are dealing with a async function, you can put async on the 1st arg of the useEffect hook
    // you have to create another callback inside of the useEffect hook and put it there
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = { products, setProducts }

    return (
    <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
    );
}


