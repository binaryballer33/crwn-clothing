import ProductCard from "../product-card/product-card.component";

import {
  Preview,
  CategoryPreviewContainer,
  Title,
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title className="title" to={title}>
          {title.toUpperCase()}
        </Title>
      </h2>

      <Preview>
        {
          // if the index < 4 then return the element aka _ , then map through and create the 4 ProductCards
          products
            .filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
