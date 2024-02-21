import type { Repository } from "@/services/models/Repository"
import type { InjectionKey } from "vue"
import { createStore, type Store } from "vuex"


export const repositoryKey: InjectionKey<Store<Repository|null>> = Symbol()

export const repositoryStore = createStore<Repository|null>({
    state: () => null,
    getters: {
        hasRepository: (o) => !!o,
    },
    mutations: {
        set(state:Repository|null, value:Repository|null){
            state = value
        }
    },
    actions: {
        set(store, value:Repository){
            store.commit("set", value)
        },
        clear(store){
            store.commit("set", null)
        }
    },
})