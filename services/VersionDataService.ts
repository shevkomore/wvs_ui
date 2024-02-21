import { Connection } from "./ServerConnectionService"
import type { VersionForm } from "./models/Version"

export default{
    /**
     * Sends a version details request.
     * @param repositoryId repository the version is in
     * @param versionId version thet'll be viewed
     * @returns Promise that returns:
     *  - on resolve: VersionView object (see services/models/Version.ts)
     *  - on reject: 404NotFound() 
     *            OR 400BadRequest()
     *            OR 400BadRequest("Accessed version does not belong to specified repository")
     */
    details(repositoryId:string, versionId:string){
        return Connection().get("Repository/VersionDetails",{data:{repositoryId,versionId}})
    },
    image(repositoryId:string, imageId:string){
        return Connection().get("Repository/Image",{params:{repositoryId,imageId}, responseType: 'blob' })
    },
    edit(version:VersionForm, repositoryId:string){
        let form = new FormData()
        form.append("RepositoryId",repositoryId)
        if(version.versionId)
            form.append("VersionId", version.versionId)
        form.append("Name", version.name)
        if(version.description)
            form.append("Description", version.description)
        form.append("Color", version.color)
        if(version.image)
            form.append("Image", version.image)
        return Connection().post("Repository/EditVersion",
        form, {headers:{'Content-Type':'multipart/form-data'}})
    },
    create(version:VersionForm, repositoryId:string){
        let form = new FormData()
        form.append("Repository",repositoryId)
        if(version.parent)
            form.append("Parent", version.parent)
        form.append("Name", version.name)
        if(version.description)
            form.append("Description", version.description)
        form.append("Color", version.color)
        form.append("Data", version.data!)
        if(version.image)
            form.append("Image", version.image)
        return Connection().post("Repository/CreateVersion",
        form, {headers:{'Content-Type':'multipart/form-data'}})
    }
}