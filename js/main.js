//Ejercicio 1: Cambiar color del nav
const nav = document.querySelector('.menu');

document.getElementById('water').addEventListener('click', () => {
    nav.style.backgroundColor = 'var(--type-water)';
});

document.getElementById('fire').addEventListener('click', () => {
    nav.style.backgroundColor = 'var(--type-fire)';
});

document.getElementById('electric').addEventListener('click', () => {
    nav.style.backgroundColor = 'var(--type-electric)';
});

document.getElementById('mostrar').addEventListener('click', () => {
    nav.style.backgroundColor = 'grey';
});


//Ejercicio 2: Mostrar los primeros 151 Pokemon 
const listaPokemon = document.getElementById('listaPokemon');

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(async (pokemon, index) => {
            const res = await fetch(pokemon.url);
            const detalle = await res.json();

            const tipos = detalle.types.map(t => t.type.name);

            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');

            pokemonDiv.innerHTML = `
                <div class="pokemon-imagen">
                    <img src="${detalle.sprites.other['official-artwork'].front_default}" alt="${detalle.name}">
                </div>
                <div class="pokemon-info">
                    <div class="nombre-contenedor">
                        <p class="pokemon-id">#${String(detalle.id).padStart(3,'0')}</p>
                        <h2 class="pokemon-nombre">${detalle.name}</h2>
                    </div>
                    <div class="pokemon-tipos">
                        ${tipos.map(t => `<p class="tipo ${t}">${t}</p>`).join('')}
                    </div>
                </div>
            `;
            listaPokemon.appendChild(pokemonDiv);
        });
    })
    .catch(error => console.error(error));


//Ejercicio 3: Buscador de Pokemon 
const inputBuscar = document.createElement('input');
inputBuscar.id = 'inputBuscar';
inputBuscar.placeholder = 'Buscar Pokémon por nombre o ID';
inputBuscar.style.margin = '1rem';

const btnBuscar = document.createElement('button');
btnBuscar.id = 'btnBuscar';
btnBuscar.textContent = 'Buscar';

const resultado = document.createElement('div');
resultado.id = 'resultado';
resultado.style.marginTop = '1rem';
resultado.style.textAlign = 'center';

const main = document.querySelector('main') || document.body; // fallback por si no hay <main>
main.appendChild(inputBuscar);
main.appendChild(btnBuscar);
main.appendChild(resultado);

btnBuscar.addEventListener('click', async () => {
  const nombre = inputBuscar.value.toLowerCase().trim();
  if (!nombre) return;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) throw new Error('Pokémon no encontrado');
    const pokemon = await res.json();

    const tipos = pokemon.types.map(t => t.type.name);

    resultado.innerHTML = `
      <h3>${pokemon.name.toUpperCase()} (#${pokemon.id})</h3>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      <div class="pokemon-tipos">
        ${tipos.map(t => `<p class="tipo ${t}">${t}</p>`).join('')}
      </div>
      <p>Altura: ${pokemon.height} | Peso: ${pokemon.weight}</p>
    `;
  } catch (err) {
    resultado.innerHTML = `<p>${err.message}</p>`;
  }
});
