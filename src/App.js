import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/routes/home/home.component';

const Shop = () => {
  return (
    <h1>I am the Shop page</h1>
  )
}

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='shop' element={<Shop />} />
      </Route>
      
    </Routes>
  );
}

export default App;
 