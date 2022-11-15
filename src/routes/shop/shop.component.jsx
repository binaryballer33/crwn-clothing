import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { fetchCategoriesAsync } from "../../store/categories/categories.action";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
    // eslint-disable-next-line
  }, []);

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
