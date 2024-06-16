<template>
    <v-table>
        <tbody>
            <tr>
                <th class="text-right"> Nº: </th>
                <td class="text-left"> {{ pokemon.id }}</td>
            </tr>
            <tr>
                <th class="text-right"> Nome: </th>
                <td class="text-left pokemon-name"> {{ pokemon.name }}</td>
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
                <th class="text-right"> Habilidades: </th>
                <td class="text-left" :key="pokemon.name">
                    <ul>
                        <li class="pokemon-abilities" v-for="habilidade in pokemon.abilities" :key="habilidade.slot">
                            {{ habilidade.ability.name }}{{ habilidade.is_hidden ? " (Habilidade oculta)" : "" }}
                        </li>
                    </ul>
                </td>

            </tr>
        </tbody>
    </v-table>
</template>

<script>

export default {
    name: 'PokemonAbout',
    props: {
        pokemon: Object
    }
}
</script>