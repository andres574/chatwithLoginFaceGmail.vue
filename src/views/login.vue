<template lang="">
 <v-layout  justify-center mt-4>
    <v-flex xs12 sm8 xl4>
        <v-card>
           <v-card-text class="display-1 text-uppercase  white--text text-center" :class="registro? 'success': 'primary'">
               <span v-if="!registro">ingreso</span>
               <span v-if="registro" >Registro</span>

           </v-card-text>

           <v-card-text>
               <v-btn block color="error" class="ma-2" @click="loginGoogle()">
                     <v-icon left >fab fa-google-plus-g</v-icon>

                   Google   
               </v-btn>
               <!-- <br> -->

               <v-btn block color="info" class="ma-2" @click="loginFacebook()">
                   <v-icon left >fab fa-facebook</v-icon>

                   Facebook 
               </v-btn>
           </v-card-text>
            <v-card-text>
                <v-btn block @click="registro =true" v-if="!registro" >
                    No tienes cuenta? registrate aqui
                </v-btn>
                  <v-btn block @click="registro =false"  v-if="registro" >
                    Ya tienes cuenta? Ingresa aqui
                </v-btn>
                
            </v-card-text>
        
        </v-card>
    </v-flex>
 </v-layout>
</template>
<script>

import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            registro: false
        }
    },
    methods:{
    ...mapActions(['loginGoogle', 'loginFacebook'])
    },
    computed:{
        ...mapState(['usuario'])
    }
    
}
</script>
<style lang="">
    
</style>