import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import menu from './modules/menu'
import user from './modules/user'
import role from './modules/role'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:   {
        app: app,
        menu: menu,
        user: user,
        role: role
    }
})
