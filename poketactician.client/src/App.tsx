import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './components/Results';
import { Pokemon } from './types';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
} from '@nextui-org/react';
import useMeasure from 'react-use-measure';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  let [ref, { height }] = useMeasure();

  useEffect(() => {
    populatePokemonData();
  }, []);

  return (
    <>
      <Navbar
        isBordered
        ref={ref}
        className="z-10 w-full fixed top-0 left-0 right-0"
      >
        <NavbarBrand>
          <Image src="./favicon.ico" width={height} />
          <p className="font-bold hidden sm:flex">PokeTactician</p>
        </NavbarBrand>
        <p className="font-bold sm:hidden">PokeTactician</p>
        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
        ></NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex"></NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="container pt-12 sm:pt-0">
        <h1 id="tableLabel">Suggested Team</h1>
        <br />
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
