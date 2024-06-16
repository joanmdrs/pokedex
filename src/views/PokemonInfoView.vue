<template>
    <v-container class="button-on-back">
        <v-btn class="ma-2" @click="go_back">
            <v-icon
            icon="mdi-arrow-left"
            start
            ></v-icon>
            VOLTAR
        </v-btn>
    </v-container>
    <v-container class="page-pokemon-info mb-10">
        <v-container class="header-page-pokemon">
            <v-container class="pa-5 pb-0 ma-0">
                <h1 class="pokemon-name"> # {{ pokemon.id }} {{ pokemon.name }} </h1>
            </v-container   >
        
            <v-container class="container-types-pokemon pa-5 ma-0">
                <span   
                    v-for="type in pokemon.types" 
                    :key="type" class="type-pokemon" 
                    :style="{ backgroundColor: getPokemonColor(type)}"
                >
                    {{ type }}
                </span>
            </v-container>
        </v-container>

        <v-container class="content-page-pokemon">
            <v-container class="image-pokemon" :style="{ backgroundColor: getBackgroundColor(pokemon.types) }">
                <img 
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
                    :alt="pokemon.name"
                    width="80%"
                />
            </v-container>

            <v-container>
                <v-tabs v-model="tab">
                    <v-tab class="custom-tab" value="about">Sobre</v-tab>
                    <v-tab class="custom-tab" value="statistics">Estatísticas</v-tab>
                    <v-tab class="custom-tab" value="evolution">Evolução</v-tab>

                </v-tabs>
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="about">
                            <PokemonAboutVue :pokemon="pokemon"/>
                        </v-tabs-window-item>
                            
                        <v-tabs-window-item value="statistics">
                            <PokemonStatsVue :pokemon="pokemon" />
                        </v-tabs-window-item>

                        <v-tabs-window-item value="evolution">
                            <!-- <PokemonEvolutionVue :pokemon="pokemon" /> -->
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import { getBackgroundColor, getPokemonColor } from '@/utils';
import axios from 'axios';
import PokemonAboutVue from '@/components/PokemonAbout.vue';
import PokemonStatsVue from '@/components/PokemonStats.vue';
// import PokemonEvolutionVue from '@/components/PokemonEvolution.vue';

export default {
  name: 'PokemonInfoView',

  components: {
    PokemonAboutVue,
    PokemonStatsVue,
    // PokemonEvolutionVue,

  },
  data: () => ({
    pokemon: {},
    tab: null,
  }),

  methods: {
    getBackgroundColor,
    getPokemonColor,

    get_pokemon(id) {
      try {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
            this.pokemon = response.data
            this.pokemon.types = response.data.types.map(type => type.type.name);
        })
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error);
      }
    },

    go_back(){
        this.$router.back()
    }
  },

  mounted(){
    const id = this.$route.params.id;
    this.get_pokemon(id);
  }
  
};
</script>

<style>

.page-pokemon-info {
    border: 2px solid #3A2F66;
    border-radius: 20px;
}

.pokemon-name, 
.pokemon-abilities {
    text-transform: capitalize;
}

.content-page-pokemon {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.content-page-pokemon .image-pokemon {
    border-radius: 20px;
}

.custom-tab {
    font-size: 14px;
    padding: 10px 15px; 
    min-width: 120px;
}

.v-tab--active .custom-tab {
    background-color: red;
    color: #ffffff; 
}

.v-tab--active .custom-tab:hover {
    background-color: #2a1e50;
}

.v-tab:hover .custom-tab {
    background-color: #e0e0e0;
}

</style>
