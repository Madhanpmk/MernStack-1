
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Insert from './Operations/Insert'
import Update from "./Operations/Update"
import DisplayData from "./Operations/DisplayData"
import Delete from "./Operations/Delete"
import Contact from "./Operations/Contact"
import About from "./Operations/About"



function App() {
 

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/insert" element={<Insert/>}></Route>
      <Route path="/delete" element={<Delete/>}></Route>
      <Route path="/update" element={<Update/>}></Route>
      <Route path="/displaydata" element={<DisplayData />} />
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/about" element={<About/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
