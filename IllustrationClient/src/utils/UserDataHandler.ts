import { useUserDataStore } from "../store"
import { GetUserData } from "./Api"
import { UserData } from "./Types"

const {updateId, updateUsername, updateAvatar} = useUserDataStore((store) => store)
const setUserData = (data:UserData) =>{
  updateId(data.id)
  updateUsername(data.username)
  updateAvatar(data.avatar)
} 

export function fetchAndUpdateUserData(){
    GetUserData().
    then((res:UserData)=>{
        setUserData(res)
    })
}