import { Routes, Route } from "react-router-dom";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

import "./shop.styles.scss";

const Shop = () => {
  return (
    // when you click shop, the <Shop /> component mounts
    // when it mounts at the /shop route the index loads which mounts CategoriesPreview
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
