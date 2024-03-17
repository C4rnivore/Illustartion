import { create } from "zustand";
import { UserData, UserDataActions } from "./utils/Types";

export const useUserDataStore = create<UserData & UserDataActions>((set)=>({
    id:null,
    username:null,
    avatar:null,
    email:null,
    
    updateId: (id:UserData['id']) => set(() => ({ id: id })),
    updateUsername: (username:UserData['username']) => set(() => ({ username: username })),
    updateAvatar: (avatar:UserData['avatar']) => set(() => ({ avatar: avatar })),
    updateEmail:(email:UserData['email']) => set(() => ({ email: email })),
}))