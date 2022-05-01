import { firebase, auth, db, storage } from '../../firebase'
import store from '../store'
import moment from 'moment';
export default {
    namespaced: true,


    state: {

        chatear: [],

        reglas: [
            v => !!v || "tienes que escribir algo"
        ],
    },
    mutations: {
        mensajeChat(state, payload) {
            state.chatear = payload
        }
    },
    actions: {
        async enviarMensaje({ commit, state }, mensaje) {

            let datos = store.state.usuario

            if (mensaje != "") {
                await db.collection('chat').add({
                    mensaje: mensaje,
                    nombre: datos.nombre,
                    foto: datos.foto,
                    fecha: Date.now()


                }).catch(error => console.log(error))

            } else {
                console.log("vacio")
            }


        },
        async chat({ commit, state }) {

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
                        //   console.log(store.state.usuario.nombre)

                })
            })

        }

    }
}