import errorPages from "./errorPages"

export const serverUrl = "https://localhost:7026/"

/**
 * Names of actions defined in store modules.
 * This way there are less chances of misspelling, 
 * and VSCode hints work properly.
 * 
 * Usage:
 * 
 * store.dispatch(authorization.storeActions.\<name of action\>,\<data\>)
 */
export const storeActions = {
    setRepository: "set",
    clearRepository: "clear",
    setPage: "set",
}

export const icons = {
    access:{
        view: "mdi-account-eye",
        add: "mdi-account-plus",
        remove: "mdi-account-minus",
        edit: "mdi-account-wrench",
        author: "mdi-account-star"
    }
}

export const idRegex = "[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}"

export const defaultNodeColor = "#90B3AE"

export default {
    serverUrl,
    storeActions,
    idRegex,
    errorPages,
    defaultNodeColor,
}