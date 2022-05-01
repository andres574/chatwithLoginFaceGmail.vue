<template>
  <v-app>
    <Navbar/>

    <v-main>
<v-container>
        <router-view/>

</v-container>
    </v-main>
  </v-app>

  
</template>

<script>

import {mapActions, mapState} from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
components:{
Navbar
},
  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['cerrarCesion'])
  },
  computed:{
    ...mapState(['usuario'])
  }
};
</script>
