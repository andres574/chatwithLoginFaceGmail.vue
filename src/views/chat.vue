
<template>
  <v-layout>
      <v-flex>
          <v-card>
              <v-card-text>
                  <h3>Bienvedido {{usuario.nombre}}</h3>
              </v-card-text>
              <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll> 
                  <div :class="item.nombre === usuario.nombre ? 'text-right': 'text-left' " v-for="(item,index) in chatear" :key="index"
                  >
                      <v-chip >
                        <v-avatar class="mr-2">
                            <img :src=item.foto alt="" >
                        </v-avatar>
                       {{item.mensaje}}
                      </v-chip>
                      <p class="caption mr-2">{{item.fecha}}</p>
                  </div>
              </v-card-text>
              <v-card-text>
                  <v-form @submit.prevent="enviarMensaje(mensajes),reset()"  v-model="valido">
                    <v-text-field v-model="mensajes"  label="Escribe un msj..." required :rules="reglas">

                    </v-text-field>
                  </v-form>
              </v-card-text>
          </v-card>
      </v-flex>
  </v-layout>
</template>
<script>
import {mapState, mapActions} from "vuex";


export default {


    data(){
        return{

    valido:false,
    mensajes: ""
        }
    
    },
    props:{

    },


    computed:{
        ...mapState(["usuario"]),
        ...mapState('chatModule',["reglas", "chatear"])
    
    },
    methods:{
      ...mapActions('chatModule',["enviarMensaje","chat"]),
      reset(){
          this.mensajes = "";
      }
    
    },created(){
        this.chat()
    }
    
    
}
</script>