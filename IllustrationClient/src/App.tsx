import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero/Hero"
import Header from "./components/Header/Header"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import PersonalPage from "./pages/PersonalPage/PersonalPage"
import { Toaster } from "react-hot-toast"
import IllustrationPage from "./pages/IllustrationsPage/IllustrationsPage"
import Explore from "./pages/Explore/Explore"

export const api ='http://127.0.0.1:8000'

function App() {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path='/' element={<>
          <Header/>
          <Hero/>
        </>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/lk/:userId' element={<PersonalPage/>}/>
        <Route path='/illustrations/:userId' element={<IllustrationPage/>}/>
        <Route path='/explore' element={<>
          <Header/>
          <Explore/>
        </>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
