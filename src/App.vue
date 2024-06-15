<template>
  <v-app>
    <v-container class="header-pokedex">
      Pokédex
    </v-container>

    <v-container class="container-pokedex">
      <v-row>
        <v-col
          v-for="(pokemon, index) in pokemons"
          :key="index"
          cols="12"
          md="3"
        >
          <v-card :class="['card-pokemon']">
            <v-container class="container-image-pokemon ma-0" :style="{ backgroundColor: get_background_color(pokemon.types) }">
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
                :alt="pokemon.name"
                width="80%"
              />
            </v-container>

            <v-container class="container-info-pokemon ma-0">
              <v-container class="container-number-name-pokemon">
                <h4>n° {{ pokemon.order }}</h4>
                <h3 class="text-center">{{ pokemon.name }}</h3>
              </v-container>
              
              <v-container class="container-types-pokemon">
                <span v-for="type in pokemon.types" :key="type" class="type-pokemon" :style="{ backgroundColor: get_pokemon_color(type)}" >
                  {{ type }}
                </span>
              </v-container>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    pokemons: []
  }),
  mounted() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        this.pokemons = response.data.results;

        this.pokemons.forEach((pokemon) => {
          const id = this.get_id(pokemon);
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
            pokemon.id = response.data.id;
            pokemon.order = response.data.order;
            pokemon.types = response.data.types.map(type => type.type.name);
          });
        });
      });
  },
  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
    get_background_color(types) {
      if (types === undefined) return 'rgba(88, 88, 88, 0.5)'; // Cinza com transparência

      if (types.includes('fire')) return 'rgba(229, 40, 41, 0.5)';
      if (types.includes('water')) return 'rgba(41, 128, 239, 0.5)';
      if (types.includes('grass')) return 'rgba(63, 161, 41, 0.5)';
      if (types.includes('poison')) return 'rgba(145, 65, 203, 0.5)';
      if (types.includes('bug')) return 'rgba(166, 185, 26, 0.5)';
      if (types.includes('fighting')) return 'rgba(255, 128, 0, 0.5)';
      if (types.includes('flying')) return 'rgba(129, 185, 239, 0.5)';
      if (types.includes('ground')) return 'rgba(145, 81, 33, 0.5)';
      if (types.includes('rock')) return 'rgba(176, 170, 131, 0.5)';
      if (types.includes('ghost')) return 'rgba(112, 65, 112, 0.5)';
      if (types.includes('electric')) return 'rgba(250, 192, 0, 0.5)';
      if (types.includes('psychic')) return 'rgba(239, 65, 121, 0.5)';
      if (types.includes('ice')) return 'rgba(61, 206, 243, 0.5)';
      if (types.includes('dragon')) return 'rgba(80, 96, 225, 0.5)';
      if (types.includes('steel')) return 'rgba(96, 161, 184, 0.5)';
      if (types.includes('dark')) return 'rgba(98, 77, 78, 0.5)';
      if (types.includes('fairy')) return 'rgba(239, 112, 239, 0.5)';
      if (types.includes('stellar')) return 'rgba(64, 181, 165, 0.5)';
      if (types.includes('normal')) return 'rgba(159, 161, 159, 0.5)';

      return 'rgba(104, 160, 144, 0.5)'; // Cor padrão com transparência
    },
    get_pokemon_color(type) {
      // Função para obter a cor de acordo com o tipo
      switch (type) {
        case 'fire':
          return '#E52829';
        case 'water':
          return '#2980EF';
        case 'grass':
          return '#3FA129';
        case 'poison':
          return '#9141CB';
        case 'bug':
          return '#A6B91A';
        case 'fighting':
          return '#FF8000';
        case 'flying':
          return '#81B9EF';
        case 'ground':
          return '#915121';
        case 'rock':
          return '#B0AA83';
        case 'ghost':
          return '#704170';
        case 'electric':
          return '#FAC000';
        case 'psychic':
          return '#EF4179';
        case 'ice':
          return '#3DCEF3';
        case 'dragon':
          return '#5060E1';
        case 'steel':
          return '#60A1B8';
        case 'dark':
          return '#624D4E';
        case 'fairy':
          return '#EF70EF';
        case 'stellar':
          return '#40B5A5';
        case 'normal':
          return '#9FA19F';
        default:
          return '#68A090'; // Cor padrão
      }
    }
  }
};
</script>



<style scoped>

.header-pokedex {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #3A2F66;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container-pokedex {
  border: 2px solid #3A2F66;
  border-radius: 20px;
  padding: 20px;
}

.card-pokemon {
  padding: 10px;
  box-shadow: none;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  border-radius: 20px;
}

.card-pokemon:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.1);
}

.container-image-pokemon {
  border-radius: 10px;
}

.container-image-pokemon img {
  display: block;
  margin: 0 auto;
}

.container-info-pokemon {
  margin: 0;
  padding: 0;
}

.container-number-name-pokemon {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.container-number-name-pokemon h4 {
  color: #585858;
}

.container-number-name-pokemon h3 {
  text-transform: capitalize;
  margin: 0;
}

.container-types-pokemon {
  display: flex;
  gap: 10px;
}

.type-pokemon {
  width: 70px;
  text-align: center;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
}


</style>

