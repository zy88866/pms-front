import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import menu from './modules/menu'
import user from './modules/user'
import role from './modules/role'
import costSet from './modules/costSet'
import house from './modules/house'
import door from './modules/door'
import park from './modules/park'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:   {
        app: app,
        menu: menu,
        user: user,
        role: role,
        costSet: costSet,
        house: house,
        door: door,
        park: park
    }
})
