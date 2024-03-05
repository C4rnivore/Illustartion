import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero/Hero"
import Header from "./components/Header/Header"
import Register from "./pages/Register/Register"

export const api ='http://localhost:8000'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
