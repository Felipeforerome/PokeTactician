import { useEffect, useState } from 'react';
import './App.css';

interface Pokemon {
    name: string;
    hp: number;
    att: number;
    type1: string;
}

function App() {
    const [forecasts, setPokemons] = useState<Pokemon[]>();

    useEffect(() => {
        populatePokemonData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Type 1</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.name}>
                        <td>{forecast.name}</td>
                        <td>{forecast.hp}</td>
                        <td>{forecast.att}</td>
                        <td>{forecast.type1}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Pokemon Stats</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populatePokemonData() {
        const response = await fetch('/api/pokemons');
        console.log(response);
        const data = await response.json();
        setPokemons(data);
    }
}

export default App;