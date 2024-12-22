import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './components/Results';
import PokemonNavbar from './components/Navbar';
import { Pokemon } from './types';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    populatePokemonData();
  }, []);

  return (
    <>
      <PokemonNavbar />
      <div className="container pt-12 sm:pt-0">
        <Router>
          <Routes>
            <Route
              path="/results"
              element={
                pokemons ? <Results pokemons={pokemons} /> : <p>Loading...</p>
              }
            />
            <Route
              path="/results/:id"
              element={
                pokemons ? <Results pokemons={pokemons} /> : <p>Loading...</p>
              }
            />
          </Routes>
        </Router>
        <br />
      </div>
    </>
  );

  async function populatePokemonData() {
    const response = await fetch('/api/pokemons?generations=3');
    const data = await response.json();
    setPokemons(data);
  }
}

export default App;
