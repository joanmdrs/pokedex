<template>
    <v-container>
        <v-btn class="ma-2" @click="go_back">
            <v-icon
                icon="mdi-arrow-left"
                start
            ></v-icon>
            VOLTAR
        </v-btn>
    </v-container>

    <v-container class="page-pokemon mb-10">
        <v-container class="header-page-pokemon">
            <v-container class="pa-5 pb-0 ma-0">
                <h1 class="text-capitalize"> # {{ pokemon.id }} {{ pokemon.name }} </h1>
            </v-container>
        
            <v-container class="d-flex ga-5 pa-5 ma-0">
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
                    <!-- <v-tab class="custom-tab" value="evolution">Evolução</v-tab> -->

                </v-tabs>
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="about">
                            <PokemonAboutVue :pokemon="pokemon"/>
                        </v-tabs-window-item>
                            
                        <v-tabs-window-item value="statistics">
                            <PokemonStatsVue :pokemon="pokemon" />
                        </v-tabs-window-item>

                        <!-- <v-tabs-window-item value="evolution">
                            <PokemonEvolutionVue :pokemon="pokemon" />
                        </v-tabs-window-item> -->
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

.page-pokemon {
    border: 2px solid #3A2F66;
    border-radius: 20px;
}

.content-page-pokemon {
    display: flex;
}

.content-page-pokemon .image-pokemon {
    border-radius: 20px;
}

.custom-tab {
    font-size: 14px;
    padding: 10px 15px; 
}

.v-tab:hover .custom-tab {
    background-color: #e0e0e0;
}

@media screen and (max-width: 720px) {
    .content-page-pokemon {
        flex-direction: column;
    }
}

</style>
