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
  name: 'PokedexView',

  components: {
    PokemonCardVue
  },
  data: () => ({
    pokemons: []
  }),

  mounted() {
    this.fetch_pokemons()
  },

  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },

    fetch_pokemons(){
      try {
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
      } catch (error) {
        console.log('Algo não funcionou como deveria: ', error)
        return {error: 'Falha ao tentar buscar os dados da API !'}
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

</style>