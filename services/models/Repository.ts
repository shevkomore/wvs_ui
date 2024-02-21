import type { Access } from "./AccessLevel"

export interface Version{
    id:string
    parent?:string
    name:string
    description?:string
    color:string
    imageLocation?:string
}

export interface Repository{
    id:string
    name:string
    description?:string
    access:Access
    versions: {[parent:string]:[Version]}
}

export interface RepositoryInfo{
    repositoryId:string,
    author:string,
    name:string,
    description?:string,
}

export interface RepositoryParams{
    Name:string,
    Description?:string
}