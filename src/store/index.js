import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
import { firebase, auth, db, storage } from '../../firebase'

import chatModule from "../modules/chatModule"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: '',
        file: null,
        urlTemp: null,
        loading: false,
        error: null,
        // para chat 

        /* chatear: [],

         reglas: [
             v => !!v || "tienes que escribir algo"
         ],*/

    },
    getters: {},
    mutations: {

        nuevoUsuario(state, payload) {
            if (payload === null) {
                state.usuario = ''
            } else {
                state.usuario = payload
            }
        },
        loadingM(state, payload) {
            state.loading = payload
        },
        mensajeChat(state, payload) {
            state.chatear = payload
        }


    },
    actions: {

        async setUsuario({ commit }, user) {
            try {
                let doc = ""
                await db.collection('usuarios').doc(user.uid).get().then(data => {
                        doc = data;
                    })
                    // verificamos si existe o no el usuario para asi mismo traer los datos de firebase y no remplazar los cambios
                    // que llegan desde google o facebook


                if (doc.exists) {
                    commit('nuevoUsuario', doc.data())

                } else {
                    const usuario = {
                        nombre: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        foto: user.photoURL

                    }

                    await db.collection("usuarios").doc(usuario.uid).set(usuario)
                    console.log('usuario guardado en bd')
                    commit('nuevoUsuario', usuario)
                }
            } catch (error) {
                console.log(error)

            }
        },

        async loginGoogle({ commit, state, dispatch }) {
            const provider = new firebase.auth.GoogleAuthProvider();

            await dispatch('ingreso', provider)
        },

        async loginFacebook({ commit, state, dispatch }) {
            const provider = new firebase.auth.FacebookAuthProvider();

            await dispatch('ingreso', provider)
        },

        async ingreso({ dispatch }, provider) {

            firebase.auth().languageCode = "es";

            try {
                const res = await firebase.auth().signInWithPopup(provider);
                const user = res.user

                // enviamos los datos del usuario a la accion setUsario para ver si existe o es nuevo 
                dispatch('setUsuario', user)

                router.push({ name: 'home' })

            } catch (error) {

                console.log(error)

            }
        },

        cerrarSesion({ commit }) {
            auth.signOut()
            commit('nuevoUsuario', null)
            router.push({ name: 'login' })
        },

        buscarImagen({ commit, state }, evento) {

            let tipoArchivo = evento.target.files[0].type
            if (tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png') {
                state.file = (evento.target.files[0])
                state.error = null

            } else {
                state.error = 'Archivo no valido'
                state.file = null
                return

            }
            // creamos una url temporal y la guardamos la imagen en un stado urlTemp

            const reader = new FileReader()
            reader.readAsDataURL(state.file)
            reader.onload = (e) => {
                state.urlTemp = e.target.result
            }

        },
        async subirImagen({ commit, state }) {
            try {

                commit('loadingM', true)
                let file = state.file
                const storageRef = storage.ref().child(state.usuario.email).child('foto perfil')

                const res = await storageRef.put(state.file) // envia la imagen guardada en state al servidor
                    // console.log(storageRef)

                // console.log('este es ', file)

                // el siguiente metodo es para sacar la url de descarga de la imagen de firebase para mostrar en app

                const urlDescarga = await storageRef.getDownloadURL()
                    // actualizamos el array del usuario su foto
                state.usuario.foto = urlDescarga
                    // actualizamos la foto en la base de datos
                await db.collection('usuarios').doc(state.usuario.uid).update({
                    foto: urlDescarga
                })

                state.error = 'Imagen subida con exito'
                state.file = null

            } catch (error) {
                console.error(error)
            } finally {
                commit('loadingM', false)

            }
        },
        /*  async enviarMensaje({ commit, state }, mensaje) {


              if (mensaje != "") {
                  await db.collection('chat').add({
                      mensaje: mensaje,
                      nombre: state.usuario.nombre,
                      foto: state.usuario.foto,
                      fecha: Date.now()


                  }).catch(error => console.log(error))

              } else {
                  console.log("vacio")
              }


          },*/

        /* async chat({ commit, state }) {

            moment.locale('es');
            let ref = db.collection("chat").orderBy("fecha", "desc").limit(10)

            ref.onSnapshot(querySnapshot => {

                let mens = []

                querySnapshot.forEach(doc => {
                    // unshitf pone los datos del reccorrido al principio y no al final como lo hace push
                    mens.unshift({
                        mensaje: doc.data().mensaje,
                        foto: doc.data().foto,
                        nombre: doc.data().nombre,
                        fecha: moment(doc.data().fecha).format('lll')
                    })
                    commit("mensajeChat", mens)

                })
            })

        }*/

    },

    modules: {
        chatModule,
    }
})