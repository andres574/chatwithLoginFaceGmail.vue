import { auth } from '../../firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Home.vue')

        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Admin.vue')

        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/login.vue')

        }
    },
    {
        path: '/chat',
        name: 'chat',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/chat.vue')

        },
        meta: {
            requiresAuth: true
        }
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    const user = auth.currentUser

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!user) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;