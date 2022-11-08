export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((accumulator, category) => {
    // how did he know about this data() method!!!
    // read the docs
    // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.QueryDocumentSnapshot#data
    const { title, items } = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});
