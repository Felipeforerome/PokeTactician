import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './components/Results';
import { Pokemon } from './types';


function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>();

    useEffect(() => {
        populatePokemonData();
    }, []);

    return (

        <div className="container">
            <h1 id="tableLabel">Pokemon Stats</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <Router>
                <Routes>
                    <Route path="/" element={pokemons ? <Results pokemons={pokemons} /> : <p>Loading...</p>} />
                    <Route path="/:id" element={pokemons ? <Results pokemons={pokemons} /> : <p>Loading...</p>} />
                </Routes>
            </Router>
            <br />
        </div>
    );

    async function populatePokemonData() {
        const response = await fetch('/api/pokemons?generations=3');
        const data = await response.json();
        setPokemons(data);
    }
}

export default App;