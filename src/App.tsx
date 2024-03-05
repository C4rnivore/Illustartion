import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero/Hero"
import Header from "./components/Header/Header"

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
