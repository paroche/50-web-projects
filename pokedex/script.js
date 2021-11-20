const poke_container = document.getElementById('poke-container');
const pokemon_count = 150; // of 901 at last count
const colors = {
  fire: '#fddfdf',
  grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#43f510',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#b0c4de',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
// I changed 'flying' above to be a light blue and 'poison' to poison green

// const main_types = Object.keys(colors); // not used

const fetchPokemons = async () => {
  for(let i=1; i<= pokemon_count; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // from pokeapi.co
  const res = await fetch(url)
  const data = await res.json();
  // if(id==1) console.log(data);
  createPokemonCard(data)
}


const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  const poke_name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_id = pokemon.id.toString().padStart(3, "0");
  // const poke_types = pokemon.types.map(type => type.type.name); // 'types' is an array of objects, so 'type' here at first is the element of the array, then are replacing it w/ the name value from the type object for within the object in that array position. 
  const poke_types = pokemon.types.map(val => val.type.name); // seems easier to understand
  //const type = main_types.find(type => poke_types.indexOf(type) > -1) // Brad's code. Finds 1st entry in main_types where the type is an element in poke_types. But it doesn't matter which type in poke_types it is, just 1st one that matches items in main_types. So could be poke's 2nd type.
  // const poke_type = main_types.find(type => type==poke_types[0]); // I just look for the 1st type here. (main_types is an array of the types. gets the 1st match, though the poke may have more than one type. I'm just using it for setting the color). This works, but seems unnecessary to use main_types array
  const poke_type = poke_types[0]; // This is simpler. I think Brad's code was trying to find any match in types. I'm assuming all types are valid w/ color list
  const poke_typeList = poke_types.join(", "); // mine
  const type1Color = colors[poke_type] ? colors[poke_type] : '#fff'; // just in case poke type isn't on color list
  let background = type1Color;
  // If have 2nd type, set up linear gradient for 2 type colors
  if (poke_types.length >= 2) {
    const poke_type2 = poke_types[1];
    const type2Color = colors[poke_type2] ? colors[poke_type2] : '#fff';
    if (type2Color) {
      background = `linear-gradient(to right bottom, ${type1Color}, ${type1Color}, ${type2Color})`;
    }
  }

  pokemonEl.style.background = background;
  const pokemonInnerHTML = `
      <div class="img-container">
        <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="">
      </div>
      <div class="info">
        <span class="number">#${poke_id}</span>
        <h3 class="name">${poke_name}</h3>
        <small class="type">Type: <span>${poke_typeList}</span></small>
      </div>
  `
  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
}


fetchPokemons();