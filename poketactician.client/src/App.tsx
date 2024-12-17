import { useEffect, useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Button
} from "@nextui-org/react";
import './App.css';
import PokemonCard from './components/PokemonCard/PokemonCard';

interface Pokemon {
    id: number;
    name: string;
    hp: number;
    att: number;
    deff: number;
    spAtt: number;
    spDeff: number;
    spe: number;
    type1: string;
    type2: string;
}

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        populatePokemonData();
    }, []);

    const contents = pokemons === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div className='grid grid-cols-1 md:grid-cols-3  gap-4'>
            {pokemons.map((pokemon, index) => (
                <div className='col-span-1' key={index}>
                    <PokemonCard
                        name={pokemon.name}
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        type1={pokemon.type1}
                        type2={pokemon.type2}
                        hp={pokemon.hp}
                        attack={pokemon.att}
                        defense={pokemon.deff}
                    />
                </div>
            ))}
        </div>

    return (
        <div>
            <h1 id="tableLabel">Pokemon Stats</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <br />
            <>
                <Button className='dark' onPress={onOpen}>Open Drawer</Button>
                <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className='dark'>
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                                <DrawerBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                        adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                        deserunt nostrud ad veniam.
                                    </p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </DrawerFooter>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>
            </>
        </div>
    );

    async function populatePokemonData() {
        const response = await fetch('/api/pokemons?typeId=14&generations=1');
        console.log(response);
        const data = await response.json();
        setPokemons(data);
    }
}

export default App;