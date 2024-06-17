import { createRouter, createWebHistory } from 'vue-router'
import PokemonInfoView from '../views/PokemonInfoView.vue'
import PokedexView from '../views/PokedexView.vue'

const routes = [
  {
    path: '/',
    name: 'pokedex',
    component: PokedexView
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: PokemonInfoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
