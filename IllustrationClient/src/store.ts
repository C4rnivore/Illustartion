import { create } from "zustand";
import { UserData, UserDataActions } from "./utils/Types";

export const useUserDataStore = create<UserData & UserDataActions>((set)=>({
    id:null,
    username:null,
    avatar:null,
    updateId: (id:UserData['id']) => set(() => ({ id: id })),
    updateUsername: (username:UserData['id']) => set(() => ({ username: username })),
    updateAvatar: (avatar:UserData['id']) => set(() => ({ avatar: avatar })),
}))