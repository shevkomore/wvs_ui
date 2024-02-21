export interface ErrorMessage{
    title:string,
    description?:string
}
export default {

    '404':{
        title:"Page not found",
        description:"The page either does not exist, or is inaccessible from your account."
    },
    '400':{
        title:"Bad Request",
        description:"There isn't enough data to find the request. Please add missing data or use the website UI."
    },
    '500':{
        title:"Oops!",
        description:"Something went wrong."
    },
} satisfies {[id:string]:ErrorMessage} as {[id:string]:ErrorMessage}