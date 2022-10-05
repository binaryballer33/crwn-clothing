import './App.css';
import './categories.styles.scss';
import CategoryItem from './components/category-item/category-item.component';

function App() {
  const categories = [
    {
      id: 1,
      title: 'Hats',
    },
    {
      id: 2,
      title: 'Jackets',
    },
    {
      id: 3,
      title: 'Sneakers',
    },
    {
      id: 4,
      title: 'Womens',
    },
    {
      id: 5,
      title: 'Mens',
    },
  ]

  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id}/>
      ))}
    </div>
  );
}

export default App;
 