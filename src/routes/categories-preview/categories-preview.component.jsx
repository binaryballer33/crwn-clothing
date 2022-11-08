// import { useContext } from "react";

import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/categories.selector"

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    // <> is shorthand for writing <Fragment>
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
