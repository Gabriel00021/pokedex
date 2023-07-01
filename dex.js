const getpokemonurl = id=> `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchpokemon = ()=>{
    const pokemonpromises = [];
    for (let i = 1; i <= 150; i++) {
        pokemonpromises.push(fetch(getpokemonurl(i)).then(Response=>Response.json()))
        
    }
    Promise.all(pokemonpromises)
        .then((pokemons)=>{
            const listpokemons = pokemons.reduce((acumulador, pokemon)=>{
                const types = pokemon.types.map(typeInfo=>typeInfo.type.name);
                acumulador +=`
                <div class="pokemon ${types[0]}">
                <div class="espaco">
                <img class="imagem" alt="${pokemon.name}" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
                </div>
                <p class="nome">${pokemon.id} | ${pokemon.name}</p> 
                <p class="tipos">${pokemon.types.map(typeInfo=>typeInfo.type.name).join(' | ')}</p>
                </div>
                `
                return accumulator;
            },'');

            const ul = document.querySelector('[data-js="pokedex"]');
            ul.innerHTML = listPokemons;
            });
    };

fetchpokemon();