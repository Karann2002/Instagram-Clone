import './App.css'
import {BrowserRouter} from "react-router-dom"
import MainRoutes from './Routes/MainRoutes'
import { UserProvider } from './Context/UserContext'
import socket from '../socket'  
function App() {
 

  return (
    <UserProvider>
     
    <BrowserRouter>
    <MainRoutes/>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
