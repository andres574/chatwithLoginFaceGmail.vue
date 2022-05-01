import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { auth } from '../firebase'
import vuechatScroll from '../node_modules/vue-chat-scroll'
Vue.use(vuechatScroll)

Vue.config.productionTip = false

auth.onAuthStateChanged((user) => {
    if (user) {
        var displayName = user.displayName
        var email = user.email
        var photoURL = user.photoURL
        var uid = user.uid

        store.dispatch('setUsuario', user)

        console.log(displayName)
        router.push({ name: 'home' })
    }

})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')