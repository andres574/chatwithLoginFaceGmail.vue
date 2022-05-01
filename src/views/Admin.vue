<template lang="">
<v-layout  justify-center>
    <v-flex xs6>
        <v-card class="text-center">
    <v-card-text>
        <v-avatar>
            <img :src='usuario.foto'>
        </v-avatar>
    </v-card-text>
    <v-card-text>
        <h3>
            <b>{{usuario.nombre}}</b>
        </h3>
        
    </v-card-text>
    <v-card-text>

        <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
        <v-btn color="primary" class="mr-3" @click="$refs.boton.click()">
            BUSCAR IMAGEN
        </v-btn>
         <v-btn color="success" :disabled="file === null"  :loading="loading" @click="subirImagen()">
            SUBIR IMAGEN
        </v-btn>
    </v-card-text>
    <v-card-text v-if="error">
        <b>{{error}}</b>
        
    </v-card-text>

    <v-card-text v-if='file'>
        <h4>
            {{file.name}}
        </h4>
        <v-img :src="urlTemp"></v-img>
    </v-card-text>
        </v-card>

    </v-flex>
</v-layout>
</template>
<script>

import {mapState, mapActions} from 'vuex'
export default {
//     data(){
// return {
//     file:null
// }
//     },
    computed:{
        ...mapState(['usuario','file', 'urlTemp', 'loading','error'])
    },
    methods:{
        ...mapActions(['buscarImagen', 'subirImagen'])
    }

    
}
</script>
<style lang="">
    
</style>