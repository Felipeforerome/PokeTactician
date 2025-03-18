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
  const [objectiveFunctions, setObjectiveFunctions] = useState<string[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 640,
  );
  const [isLoading, setIsLoading] = useState(false);

  function handleFilterChange(id: string, value: any) {
    setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
  }

  const applyFilters = () => {
    setIsLoading(true);
    const filterArray: [string, any][] = [];
    const preselectedMoves: string[] = [];
    filterArray.push(['mega', false]);
    filterArray.push(['battleOnly', false]);
    filterArray.push(['totem', false]);

    // Sort the pokemons by id
    pokemons?.sort((a, b) => a.id - b.id);

    // Add preselected pokemons to the filter array
    pokemons?.forEach((pokemon) => {
      filterArray.push(['preselected', pokemon.id]);
      // Add preselected moves to the moves array
      if (pokemon.moves.length > 0) {
        const tempPreselectedMoves = pokemon.moves
          .map((move) => move.id)
          .join(',');
        preselectedMoves.push(tempPreselectedMoves);
      } else {
        preselectedMoves.push('.');
      }
    });
    const countPreselected = pokemons?.length;
    // Add the rest of the filters to the filter array
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
    populatePokemonData(
      filterParams.toString(),
      countPreselected,
      preselectedMoves,
    );
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
        selectObjectiveFunctions={setObjectiveFunctions}
        isMobile={true}
      />
      <div className="container pt-12 sm:pt-0 flex h-screen">
        {isSidebarVisible && (
          <div className="hidden sm:block">
            <Sidebar
              updateFilters={handleFilterChange}
              applyFilters={applyFilters}
              selectStrategy={setStrategy}
              selectRoles={setRoles}
              selectObjectiveFunctions={setObjectiveFunctions}
              isMobile={false}
            />
          </div>
        )}
        <div
          className={`content flex-grow overflow-visible ${
            isSidebarVisible ? 'ml-64' : ''
          }`}
        >
          <Router>
            <div className="relative">
              {isLoading && (
                <div className="absolute -inset-1 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div
                    className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-500"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
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
            </div>
          </Router>
          <br />
        </div>
      </div>
    </>
  );

  async function populatePokemonData(
    filterString: string = '',
    countPreselected: number = 0,
    preselectedMoves: string[] = [],
  ) {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || `${location.origin}`;
      var engineCommand = `--poklistUrl '${baseUrl}/api/Pokemons/?${filterString}'`;
      if (countPreselected > 0) {
        engineCommand += ` --preselected ${countPreselected}`;
      }
      if (preselectedMoves.length > 0) {
        engineCommand += ` --preselected_moves ${preselectedMoves.join(' ')}`;
      }
      if (strategy !== 'none') {
        engineCommand += ` --strategy ${strategy}`;
      }
      if (roles.length > 0) {
        engineCommand += ` --roles ${roles.join(' ')}`;
      }
      if (objectiveFunctions.length > 0) {
        engineCommand += ` --objfun ${objectiveFunctions.join(' ')}`;
      }
      const response = await fetch(`${baseUrl}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          argument: engineCommand,
        }),
      });
      const rawData = await response.json();
      const data = rawData.map((pokemon: any) => {
        if (pokemon.knowableMoves) {
          pokemon.moves = pokemon.knowableMoves;
          delete pokemon.knowableMoves;
        }
        return pokemon;
      });
      setPokemons(undefined);
      setPokemons(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    } finally {
      // Set loading state to false after data is fetched
      setIsLoading(false);
    }
  }
}

export default App;
