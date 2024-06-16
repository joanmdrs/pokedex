<template>
    <v-card class="card-pokemon" @click="go_to_pokemon_info(pokemon.id)">
        <v-container class="container-image-pokemon" :style="{ backgroundColor: getBackgroundColor(pokemon.types) }">
            <img 
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
            :alt="pokemon.name"
            width="80%"
            />
        </v-container>

        <v-container class="container-info-pokemon">
            <v-container class="container-number-name-pokemon">
            <h4>n° {{ pokemon.id }}</h4>
            <h3 class="text-center">{{ pokemon.name }}</h3>
            </v-container>
            
            <v-container class="container-types-pokemon">
            <span v-for="type in pokemon.types" :key="type" class="type-pokemon" :style="{ backgroundColor: getPokemonColor(type)}" >
                {{ type }}
            </span>
            </v-container>
        </v-container>
        </v-card>
</template>

<script> 
import { getBackgroundColor, getPokemonColor } from '@/utils';

export default {

    name: 'PokemonCard',

    props: {
        pokemon: Object,
    },

    methods: {
        go_to_pokemon_info(id) {
            this.$router.push({ name: 'pokemon', params: { id: id } });
        },
        getBackgroundColor,
        getPokemonColor,
    }
}
</script>

<style>
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