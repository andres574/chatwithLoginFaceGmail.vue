<template lang="">
 <nav >
     <v-app-bar  app
      color="primary"
      dark
    >

          <v-app-bar-nav-icon @click="drawer =!drawer" v-if="usuario"></v-app-bar-nav-icon >

    <v-toolbar-title class="headline text-uppercase">
     <!-- <router-link :to="{name:'Home'}"> -->
        <span>Vue</span>
     <!-- </router-link> -->
    </v-toolbar-title>
      

      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion"  v-if="usuario">    
        <span class="mr-2">Cerrar cesion</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer class='primary' v-model='drawer' app v-if="usuario" >

        <v-layout column align-center mt-5>
            <v-flex>
                <v-avatar>
                <img :src='usuario.foto'>
                </v-avatar>
            </v-flex>
            <v-flex>
                <p><b>{{usuario.nombre}}</b></p>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-list>
            <v-list-item v-for="item in items"
          :key="item.title"
          :to="item.to">
                    <v-list-item-icon>
            <v-icon>
               {{item.icon}}
            </v-icon>
          </v-list-item-icon>
              <v-list-item-content>
            <v-list-item-title><b>{{item.titulo}}</b></v-list-item-title>
          </v-list-item-content>
              </v-list-item>
              
        </v-list>
    </v-navigation-drawer>


 </nav>
</template>
<script>

import {mapActions, mapState} from 'vuex'

export default {
    data(){
return{
    drawer:true,
    items: [
          { titulo: 'Dashboard', icon: 'fas fa-address-card', to:{name:'home'} },
          { titulo: 'cuenta', icon: 'fas fa-address-card', to:{name:'home'} },
          { titulo: 'Admin', icon: 'fa-solid fa-user-tie', to:{name:'admin'} },
           { titulo: 'Chat', icon: 'fa-solid fa-comment', to:{name:'chat'} },
        ]
}
    },
   methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapState(['usuario'])
  }
}
</script>
<style lang="">
    
</style>