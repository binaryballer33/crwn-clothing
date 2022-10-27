import { useState, createContext, useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // when you are dealing with a async function, you can put async on the 1st arg of the useEffect hook
    // you have to create another callback inside of the useEffect hook and put it there
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap, setCategoriesMap }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}


