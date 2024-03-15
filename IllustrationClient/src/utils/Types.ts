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

export type UserData = {
    id:Nullable<string>,
    username:Nullable<string>,
    avatar:Nullable<string>,
}

export type UserDataActions = {
    updateId: (id: UserData['id']) => void,
    updateUsername: (username: UserData['username']) => void,
    updateAvatar: (avatar: UserData['avatar']) => void,
}

type Nullable<T> = null | T
