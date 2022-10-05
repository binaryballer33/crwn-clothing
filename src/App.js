import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Home from './components/routes/home/home.component';

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet />
    </div>
  )
}

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
 