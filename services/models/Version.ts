import type { Version } from "./Repository"

export interface VersionView {
    id: string
    parent?: string
    name: string
    description?: string
    color: string
    imageLocation?: string
}

export interface VersionForm{
    repositoryId: string,
    versionId?: string,
    parent?:string,
    name:string,
    description?:string,
    color:string,
    data?:File,
    image?:File
}
export function viewFromVersion(from:Version, repositoryId:string, imageFile:File|undefined):VersionForm{
    return {
        repositoryId,
        versionId:from.versionId,
        parent:from.parent,
        name:from.name,
        description:from.description,
        color:from.color,
        image:imageFile
    }
}