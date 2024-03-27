import { useEffect } from "react"
import { useUserDataStore } from "../store"
import { UserData } from "./Types"
import { GetUserData } from "./Api"

export const useUserFetch = (options?: { 
    onFetching?: (id: UserData['id']) => void, 
    onFetched?: (user: UserData) => void 
}) => {
    const {id, updateUserStore, updateUserDescription} = useUserDataStore((store) => store)
  
    useEffect(()=>{
        if(!id){
            options?.onFetching?.(id)
            GetUserData().
                then((res:UserData)=>{
                    updateUserStore(res)
                    updateUserDescription(res.description? res.description: '')
                    options?.onFetched?.(res)
                })
        }
    },[])
}