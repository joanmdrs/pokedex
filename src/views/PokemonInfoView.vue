<template>
    <v-container>
        <v-container class="page-pokemon-info">
            <v-container class="header-page-pokemon">
                <h4> nº {{ pokemon.order }}</h4>
                <h1> {{ pokemon.name }} </h1>

                <v-container class="container-types-pokemon">
                    <span v-for="type in pokemon.types" :key="type" class="type-pokemon" :style="{ backgroundColor: getPokemonColor(type)}" >
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
                                <v-table>
                                    <tbody>
                                        <tr>
                                            <th class="text-right"> ID: </th>
                                            <td class="text-left"> #{{ pokemon.order }}</td>
                                        </tr>
                                        <tr>
                                            <th class="text-right"> Nome: </th>
                                            <td class="text-left"> {{ pokemon.name }}</td>
                                        </tr>
                                        <tr>
                                            <th class="text-right"> Peso: </th>
                                            <td class="text-left"> {{ (pokemon.weight * 0.45359237).toFixed(0)}} Kgs </td>
                                        </tr>
                                        <tr>
                                            <th class="text-right"> Altura: </th>
                                            <td class="text-left"> {{ pokemon.height * 2.54 }} cm</td>
                                        </tr>
                                        <tr>
                                            <th class="text-right"> Experiência Base: </th>
                                            <td class="text-left"> {{ pokemon.base_experience}} </td>
                                        </tr>

                                        <tr>
                                            <th class="text-right"> Habilidades </th>
                                            <td class="text-left" :key="pokemon.name">
                                                <ul>
                                                    <li v-for="habilidade in pokemon.abilities" :key="habilidade.slot">
                                                        {{ habilidade.ability.name }}{{ habilidade.is_hidden ? " (Habilidade oculta)" : "" }}
                                                    </li>
                                                </ul>
                                            </td>

                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="statistics">
                                <v-table density="compact">
                                    <tbody v-for="(item, index) in pokemon.stats" :key="index">
                                        <tr>
                                            <th> {{item.stat.name}} </th>
                                            <td> {{ item.base_stat }}</td>
                                        </tr>
                                        
                                    </tbody>
                                </v-table>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="evolution">
                                <v-row class="mx-0 d-flex align-center">
                                    <template v-for="(evolution_detail, index) in evolutions()">
                                        <v-col
                                            cols="12"
                                            md="3"
                                            :key="`evolution-${index}`"
                                            v-if="typeof evolution_detail == 'object'"
                                        >
                                            <v-card> {{ evolution_detail }}</v-card>
                                        </v-col>
                                       
                                    </template>
                                    </v-row>

                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>
                </v-container>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import { getBackgroundColor, getPokemonColor } from '@/utils';
import axios from 'axios';

export default {
  name: 'PokemonInfoView',

  data: () => ({
    pokemon: {},
    tab: null,
    evolution: null
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
    fetch_evolution() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`)
        .then((response) => {
          axios.get(response.data.evolution_chain.url).then((response) => {
            this.evolution = response.data.chain;
          });
        });
    },
    evolutions() {
      let chain = [];
      let evolution = this.evolution;
      if (evolution.species) {
        chain.push(evolution.species);
      }

      while (evolution.species) {
        if (evolution.evolves_to.length > 0) {
          evolution = evolution.evolves_to[0];

          if (
            evolution.evolution_details.length > 0 &&
            evolution.evolution_details[0].min_level
          ) {
            chain.push(evolution.evolution_details[0].min_level);
          }

          if (evolution.species) {
            chain.push(evolution.species);
          }
        } else {
          break;
        }
      }

      return chain;
    },
  },

  mounted(){
    const id = this.$route.params.id;
    this.get_pokemon(id);
  },
  
  watch: {
    pokemon() {
      this.fetch_evolution();
    },
  }
  
};
</script>

<style>

.page-pokemon-info {
    border: 2px solid #3A2F66;
    border-radius: 20px;
}

.content-page-pokemon {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.content-page-pokemon .image-pokemon {
    border-radius: 20px;
}

.content-page-pokemon .info-pokemon {
}

.custom-tab {
    font-size: 14px; /* Ajusta o tamanho da fonte */
    padding: 10px 15px; /* Ajusta o preenchimento */
    min-width: 120px; /* Ajusta a largura mínima */
    text-transform: none; /* Remove a transformação de texto padrão */
}

.v-tab--active .custom-tab {
    background-color: red; /* Cor de fundo da aba ativa */
    color: #ffffff; /* Cor do texto da aba ativa */
}

.v-tab--active .custom-tab:hover {
    background-color: #2a1e50; /* Cor de fundo da aba ativa ao passar o mouse */
}

.v-tab:hover .custom-tab {
    background-color: #e0e0e0; /* Cor de fundo das abas ao passar o mouse */
}

.th-statistic {
    text-transform: capitalize;
}

</style>
