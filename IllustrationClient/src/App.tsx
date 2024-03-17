import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero/Hero"
import Header from "./components/Header/Header"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import PersonalPage from "./pages/PersonalPage/PersonalPage"
import { useEffect } from "react"
import { useUserDataStore } from "./store"
import { UserData } from "./utils/Types"
import { GetUserData } from "./utils/Api"

export const api ='http://localhost:8000'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>
          <Header/>
          <Hero/>
        </>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/lk/:userId' element={<PersonalPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
