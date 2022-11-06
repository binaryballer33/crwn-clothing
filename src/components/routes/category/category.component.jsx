import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import { useParams } from 'react-router-dom';

import ProductCard from '../../product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {/* because categoriesMap is being built asynchronously we have to
                    only return it if and only if products is true, this is why we did a product && products.map
                */}
                {products && products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </ CategoryContainer>
        </>
  )
}

export default Category;