export interface Access{
    repositoryId?:string
    userId?:string
    canView?:boolean
    canAdd?:boolean
    canRemove?:boolean
    canEdit?:boolean
    isAuthor?:boolean
}
export interface AccessSettings{
    canView?:boolean
    canAdd?:boolean
    canRemove?:boolean
    canEdit?:boolean
    isAuthor?:boolean
}

export enum AccessLevel{
    VIEW = "VIEW",
    EDIT = "EDIT",
    ADD = "ADD",
    REMOVE = "REMOVE",
    AUTHOR = "AUTHOR"
}