import type { App } from "vue/dist/vue.js";
import { repositoryKey, repositoryStore } from "./modules/repository";
import { navigationKey, navigationStore } from "./modules/navigation";

export function bindStores(appObj: App<Element>):App<Element>{
    appObj.use(repositoryStore, repositoryKey)
    appObj.use(navigationStore, navigationKey)
    return appObj
}