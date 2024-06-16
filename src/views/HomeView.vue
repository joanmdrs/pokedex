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
          <PokemonCardVue :pokemon="pokemon" /> 
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import axios from 'axios';
import PokemonCardVue from '@/components/PokemonCard.vue';

export default {
  name: 'App',

  components: {
    PokemonCardVue
  },
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
            pokemon.types = response.data.types.map(type => type.type.name);
          });
        });
      });
  },
  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
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