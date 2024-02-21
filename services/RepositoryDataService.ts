import { Connection } from "@/services/ServerConnectionService"
import type { Access, AccessLevel } from "./models/AccessLevel"
import type { RepositoryInfo, RepositoryParams } from "./models/Repository"

export default{
    /**
     * Sends a repository list request.
     * @param access if set, only repositories
     *  where user has at least all marked true access levels are displayed. 
     * e.g. Access{canEdit:true, canAdd:false} means all repositories 
     * where user has a CanEdit access level
     * 
     * @returns Promise that returns:
     *  - on resolve: [{id:string,name:string,author:string}]
     *  - on reject (if access param is used): 400BadRequest() 
     */
    list(access?:Access){
        if(!access)
            return Connection()
        .get("Repository/List")

        return Connection()
        .get("Repository/ListAccess", {params:access})
    },
    /**
     * Sends a repository details request.
     * @param repositoryId the ID of a repository whose details will be shown.
     * @returns Promise that returns:
     *  - on resolve: Repository object (see services/models/Repository)
     *  - on reject: 404NotFound() 
     *            OR 500ServerError()
     */
    details(repositoryId:string){
        return Connection()
        .get("Repository/Details",{params: {repositoryId}})
    },
    /**
     * Sends a repository creation request.
     * @param repo info needed to create a repository
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *  - on reject: 404NotFound("User not found") 
     *            OR 500ServerError()
     *            OR 400BadRequest()
     */
    create(repo:RepositoryParams){
        return Connection()
        .post("Repository/Create",{},{params:repo})
    },
    /**
     * Sends a repository edit request.
     * @param repo new repository info
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *  - on reject: 404NotFound() 
     *            OR 400BadRequest()
     */
    edit(repositoryId:string,repo:RepositoryParams){
        return Connection()
        .post("Repository/Edit",{}, {params:{repositoryId,Name:repo.Name,description:repo.Description}})
    },
    /**
     * Sends a repository user list request.
     * @param repositoryId the repository to get users of
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *  - on reject: 404NotFound() 
     *            OR 400BadRequest()
     */
    listUsers(repositoryId:string){
        return Connection()
        .get("Repository/ListUsers",{data:{repositoryId}})
    },
    /**
     * Sends a grant repository access request.
     * @param repositoryId repository to grant access to
     * @param target login of user that receives access
     * @param level level of access to grant
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *             OR 200Ok("Author does not require access level assignment")
     *  - on reject: 404NotFound() 
     *            OR 400BadRequest()
     *            OR 403Forbidden("User cannot grant access to themselves")
     *            OR 403Forbidden("At least Author access level is required to grant EDIT access")
     */
    grantAccess(repositoryId:string, target:string, level:AccessLevel){
        return Connection()
        .post("Repository/GrantAccess",{
            repositoryId,
            target,
            level
        })
    },
    /**
     * Sends a revoke repository access request.
     * @param repositoryId repository to revoke access to
     * @param target login of user that loses access
     * @param level level of access to revoke
     * @returns Promise that returns:
     *  - on resolve: 200Ok()
     *             OR 200Ok("User already has insufficient access")
     *  - on reject: 404NotFound() 
     *            OR 400BadRequest()
     *            OR 403Forbidden("Author cannot lose access")
     *            OR 403Forbidden("Without EDIT access only user's own access can be revoked")
     *            OR 403Forbidden("Only Author can revoke others' EDIT access")
     */
    revokeAccess(repositoryId:string, target:string, level:AccessLevel){
        return Connection()
        .post("Repository/RevokeAccess",{
            repositoryId,
            target,
            level
        })
    },
}