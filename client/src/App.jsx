import { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import Cart from './components/Cart.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('userData'));
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path='/' element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path='/cart' element={isAuthenticated ? <Cart setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
