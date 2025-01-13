import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './components/Results';
import PokemonNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Pokemon } from './types';
import { PreselectTeam } from './components/PreselectTeam';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [filtersStore, setFilters] = useState<Record<string, any>>({
    legendary: false,
  });
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
      />
      <div className="container pt-12 sm:pt-0 flex h-screen">
        {isSidebarVisible && (
          <div className="hidden sm:block">
            <Sidebar
              updateFilters={handleFilterChange}
              applyFilters={applyFilters}
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
                  <PreselectTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                  />
                }
              />
              <Route
                path="/:id"
                element={
                  <PreselectTeam
                    team={pokemons != undefined ? pokemons : []}
                    setTeam={setPokemons}
                  />
                }
              />
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
