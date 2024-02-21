import { serverUrl, storeActions } from "@/configuration"
import router from "@/router"
import axios from "axios"
import { authorizationData, type Authorization } from "./LocalStorageService"


export function Connection(){
    const connection = axios.create({
        baseURL: serverUrl,
        headers: {
            Authorization: `Bearer ${authorizationData.User?.token}`
        }
    })

    connection.interceptors.response.use(undefined,
        (error) => {
        if(error?.response?.status === 401){//Unauthorized
            authorizationData.clear()
            router.replace({name: "login"})
        }
        else return Promise.reject(error)
    })
    return connection
}

