import { create } from "zustand";
import { UserData, UserDataActions } from "./utils/Types";

export const useUserDataStore = create<UserData & UserDataActions>((set)=>({
    id:null,
    username:null,
    avatar:null,
    email:null,
    description:null,

    updateUserDescription: (data:UserData['description']) => set(() => ({
        description: data
       })),
       
    updateUserStore: (data:UserData) => {
        set(() => ({
            id: data.id,
            username: data.username ,
            avatar: data.avatar,
            email: data.email,
        }))
    }

   
}))