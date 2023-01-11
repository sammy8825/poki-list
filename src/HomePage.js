import React from 'react';

export default function Home() {
    const [pokiName, setPokiName] = React.useState('');
    const [pokemon, setPokemon] = React.useState({});

    React.useEffect(() => {
        if (pokiName === '' || pokiName === undefined) {
            fetch('https://pokeapi.co/api/v2/pokemon/')
                .then(res => res.json())
                .then(data => setPokemon(data.results));
        } else {
            fetch('https://pokeapi.co/api/v2/pokemon/' + pokiName + '/')
                .then(res => res.json())
                .catch(err => { if (err) console.log("No Such Pokemon found") })
                .then(data => setPokemon({
                    name: data.name,
                    abilities: data.abilities,
                    image: data.sprites.front_default,
                    height: data.height,
                    weight: data.weight,
                    type: data.types,
                    moves: data.moves
                }));
        }
    }, [pokiName])


    function handleSubmit(event) {
        event.preventDefault();
        console.log("PN", event.target[0].value)
        setPokiName(event.target[0].value);
    }

    return (
        <div>
            <span>{pokemon.name} </span>
            <img src={(pokemon.image)} alt={pokemon.name} />

            <br></br>

            <form onSubmit={handleSubmit}>
                <input placeholder='Enter Pokemone Name'/>
                <input type="submit" />
            </form>
        </div>
    );
}