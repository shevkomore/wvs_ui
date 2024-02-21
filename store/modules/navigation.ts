import type { InjectionKey } from "vue"
import { createStore, type Store } from "vuex"


export const navigationKey: InjectionKey<Store<string>> = Symbol()

export const navigationStore = createStore<string>({
    state: () => "/",
    mutations: {
        set(state:string, value:string){
            state = value
        }
    },
    actions: {
        set(store, value:string){
            store.commit("set", value)
        },
    },
})