import './App.css';
import Regsiter from './pages/Regsiter';
import Login from './pages/Login';
import Indexmain from './pages/Indexmain';
import HomeMain from './pages/HomeMain';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/Authcontext';

function App() {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {  
    console.log(currentUser);    
    
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Indexmain />} />
          <Route path='regsiter' element={<Regsiter />} />
          <Route path='login' element={<Login />} />
          <Route path='home' element={<HomeMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
