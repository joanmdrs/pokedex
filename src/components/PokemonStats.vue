<template>
    <v-container v-for="(item, index) in pokemon.stats" :key="index">
        <v-chip
            variant="elevated" 
            :color="color[index]"
            label
            style="width: 100%"
        >
            {{ transform_name(item.stat.name) }} {{ item.base_stat }}
        </v-chip>
    </v-container>

</template>

<script> 

export default {
    name: 'PokemonStats',

    data() {
        return {
            color: [
                "red",
                "orange darken-1",
                "yellow darken-2",
                "blue",
                "green",
                "pink",
            ],
        };
    },

    props: {
        pokemon: Object
    },

    methods: {
        transform_name(name) {
            if (name.includes("-")) {
                let parts = name.split("-");
                return `${parts[0].charAt(0).toUpperCase()} ${parts[1]
                .charAt(0)
                .toUpperCase()}${parts[1].slice(1)}`;
            }

            return name.charAt(0).toUpperCase() + name.slice(1);
        },
    }
}

</script>