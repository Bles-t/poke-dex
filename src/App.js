import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StartPage from './StartPage';
import PokemonPage from './PokemonPage';
import Register from './views/register';
import Login from './views/login';

function App() {
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
