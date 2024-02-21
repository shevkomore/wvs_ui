
enum LocalStoreKeys{
    AUTHORIZATION = "AUTH"
}

export interface Authorization{
    token:string|null
    login:string|null
    username :string|null
}

function store<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}
  
function retrieve<T>(key: string) {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) as T : null
}
function clear(key:string){
    localStorage.removeItem(key)
}

const nextKey = {value:0}
const authEvents: {[key:number]:((newValue:Authorization|null)=>void)} = {};
export const authorizationData = {
    get User(): Authorization|null {
        return retrieve<Authorization>(LocalStoreKeys.AUTHORIZATION)
    },
    set User(value:Authorization) {
        store<Authorization>(LocalStoreKeys.AUTHORIZATION, value)
        Object.values(authEvents).forEach((o)=>o(authorizationData.User))
    },
    clear(){
        clear(LocalStoreKeys.AUTHORIZATION)
    },
    isAuthorized(){
        return authorizationData.User?.token != null
    },
    watch(listener:(newValue:Authorization|null)=>void):number{
        authEvents[nextKey.value] = listener
        return nextKey.value++
    },
}