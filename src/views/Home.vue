<template>

<v-layout > 
  <h3 >Bienvenido {{usuario.nombre}}</h3>
</v-layout>

</template>

<script>

import {mapState} from 'vuex'

  export default {
    name: 'Home',

    components: {
    },
    computed:{
      ...mapState(['usuario'])
    }
  }
</script>
