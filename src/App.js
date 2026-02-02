import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StartPage from './StartPage';
import PokemonPage from './PokemonPage';
import Register from './views/register';
import Login from './views/login';
import { useEffect } from 'react';
function App() {

  const navigate = useNavigate();

  useEffect(() => {
    // Check login status in localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Redirect to /login if the user is not logged in
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>

      <Routes>
        <Route path="/" element={<Navigate to="/StartPage" replace />} />
        <Route path="/StartPage" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Use the Login component */}
        <Route path="/PokemonPage" element={<PokemonPage />} />
      </Routes>

    </div>

  );
}

export default App;
