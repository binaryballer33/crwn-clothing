import { createSelector } from 'reselect';

const selectCategoryReducer = (state)  => state.categories;

export const selectCategories = createSelector(
    // array of input selectors, the slices that you want from redux to produce something new
    // the only time that this will run is if selectCategoryReducer returns back something different
    // it is now cached/memoized
    [selectCategoryReducer],
    // output selector
    (categorySlice) => categorySlice.categories
)

// now this is a memoized selector
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((accumulator, category) => {
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
      }, {})
)
