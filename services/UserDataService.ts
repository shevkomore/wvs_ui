import { Connection } from "@/services/ServerConnectionService"
import type { AuthorizationRequest } from "./models/AuthorizationRequest"
import type { User } from "./models/UserData"

export default{
    /**
     * Sends a login request.
     * @param auth data required for authorization
     * @returns Promise that returns:
     *  - on resolve: Authorization object (see store/modules/authorization.ts)
     *  - on reject: 400BadRequest([sent model]) 
     *            OR 400BadRequest("Incorrect password") 
     *            OR 404NotFound("User not found")
     */
    login(auth:AuthorizationRequest){
        return Connection()
        .post("User/Login", auth)
    },
    /**
     * Sends a user creation request.
     * @param user new user data
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *  - on reject: 400BadRequest() 
     *            OR 400BadRequest("User already exists")
     *            OR 500ServerError() 
     */
    create(user:User){
        return Connection()
        .postForm("User/Create",user)
    },
    /**
     * Sends a user edit request.
     * @param user user data with changes
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *  - on reject: 400BadRequest() 
     *            OR 403Forbidden("User may only change own data, and cannot change its login") 
     */
    edit(user:User){
        return Connection()
        .postForm("User/Edit",user)
    },
    /**
     * Sends a user list request.
     * @returns Promise that returns:
     *  - on resolve: [{login:string}]
     */
    list(){
        return Connection()
        .get("User/List")
    },
    /**
     * Sends a user details request.
     * @param login Login of user that will be viewed
     * @returns Promise that returns:
     *  - on resolve: User object (see services/models/UserData.ts)
     *  - on reject: 404NotFound()
     */
    details(login:string){
        return Connection()
        .get("User/Details", {data:{login}})
    }
}