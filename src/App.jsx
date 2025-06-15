import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import LoginSignup from "./pages/LoginSignup"
import AddPost from './pages/AddPost'



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginOrSignup" element={<LoginSignup />} />
        <Route path="/addPost" element={<AddPost/>} />
        <Route path="/edit/:id" element={<AddPost />} />
      </Routes>
    </>
  )
}

export default App
