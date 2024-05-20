export type RegesitrationFields = {
    username:string,
    email:string,
    password:string,
    repeatedPassword:string
}

export type LoginFields = {
    email:string,
    password:string
}

export type UserDTO = {
    id:string,
    avatar:string|undefined
    username:string,
    email:string,
    password:string,
}

export type IMG = {
    author_id:string,
    id:string,
    link:string,
    likes:number
}

export type UserData = {
    id?:Nullable<string>,
    username?:Nullable<string>,
    avatar?:Nullable<string>,
    email?:Nullable<string>,
    description?:Nullable<string>,
    images?:Nullable<Array<string>>
}

export type UserDataActions = {
    updateUserStore: (data:UserData) => void,
    updateUserDescription: (data:UserData['description'])=> void,
    updateUserAvatar: (data:UserData['avatar'])=> void,
    updateUserImages:(data:UserData['images'])=>void
}


type Nullable<T> = null | T
