import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Pokemon } from './types';
import { PokemonTeam } from './components/PokemonTeam';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [filtersStore, setFilters] = useState<Record<string, any>>({
    legendary: false,
  });
  // Usage of strategy and roles is not yet implemented since nothing is calling the optimizer yet
  const [strategy, setStrategy] = useState<string>('none');
  const [roles, setRoles] = useState<string[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 640,
  );

  function handleFilterChange(id: string, value: any) {
    setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
  }

  const applyFilters = () => {
    setPokemons(undefined);
    const filterArray: [string, any][] = [];
    for (const key in filtersStore) {
      if (Array.isArray(filtersStore[key])) {
        filtersStore[key].forEach((item: any) => {
          filterArray.push([key, item]);
        });
      } else {
        filterArray.push([key, filtersStore[key]]);
      }
    }
    const filterParams = new URLSearchParams(filterArray);
    populatePokemonData(filterParams.toString());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <PokemonNavbar
        updateFilters={handleFilterChange}
        applyFilters={applyFilters}
        selectStrategy={setStrategy}
        selectRoles={setRoles}
      />
      <div className="container pt-12 sm:pt-0 flex h-screen">
        {isSidebarVisible && (
          <div className="hidden sm:block">
            <Sidebar
              updateFilters={handleFilterChange}
              applyFilters={applyFilters}
              selectStrategy={setStrategy}
              selectRoles={setRoles}
            />
          </div>
        )}
        <div
          className={`content flex-grow overflow-visible ${
            isSidebarVisible ? 'ml-64' : ''
          }`}
        >
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PokemonTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                    baseUrl=""
                  />
                }
              />
              <Route
                path="/:id"
                element={
                  <PokemonTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                    baseUrl=""
                  />
                }
              />
              <Route
                path="/results"
                element={
                  <PokemonTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                    baseUrl="results/"
                  />
                }
              />
              <Route
                path="/results/:id"
                element={
                  <PokemonTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                    baseUrl="results/"
                  />
                }
              />
            </Routes>
          </Router>
          <br />
        </div>
      </div>
    </>
  );

  async function populatePokemonData(filterString: string = '') {
    const response = await fetch(`/api/pokemons?${filterString}`);
    const data = await response.json();
    setPokemons(data);
  }
}

export default App;
