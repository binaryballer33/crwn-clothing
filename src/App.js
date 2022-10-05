import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Home from './components/routes/home/home.component';
import './App.css';

const Shop = () => {
  return (
    <h1>I am the Shop page</h1>
  )
}

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
      
    </Routes>
  );
}

export default App;
 