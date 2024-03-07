import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero/Hero"
import Header from "./components/Header/Header"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import { useEffect } from "react"
import axios from "axios"

export const api ='http://localhost:8000'
const appId = '87914396480-b35op3hce7mrbdp7jv3mmpc0lt1lau12.apps.googleusercontent.com'
const clientSecret = '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'
axios.defaults.withCredentials = false

function App() {
  useEffect(()=>{
    axios
    .get(api+'/api/user/get', {headers:{
      accept: 'application/json'
    }})
    .then(res=>{
      console.log(res);
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>
          <Header/>
          <Hero/>
        </>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
