import { create } from "zustand";
import { UserData, UserDataActions } from "./utils/Types";

export const useUserDataStore = create<UserData & UserDataActions>((set)=>({
    id:null,
    username:null,
    avatar:null,
    email:null,
    description:null,
    images:null,
    updateUserStore: (data:UserData) => {
        set(() => ({
            id: data.id,
            username: data.username ,
            avatar: data.avatar? data.avatar : 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg' ,
            email: data.email,
            images: data.images
        }))
    },
    updateUserAvatar: (data:UserData['avatar']) => set(() => ({
        avatar: data
    })),
    updateUserDescription: (data:UserData['description']) => set(() => ({
        description: data
    })),
    updateUserImages: (data:UserData['images']) => set(() => ({
        images: data
    }))

}))