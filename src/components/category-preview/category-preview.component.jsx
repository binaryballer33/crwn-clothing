import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component'; 

import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
    
    return (
        <div className='category-preview'>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
            </h2>

            <div className='preview'>
                {
                    // if the index < 4 then return the element aka _ , then map through and create the 4 ProductCards
                    products
                    .filter((_, index) => index < 4)
                    .map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;