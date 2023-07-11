import GlobalStyle from './assets/globalstyle'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import UserProvider from './contexts/UserContext'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import MainScreen from './pages/MainScreen/MainScreen'
import NewTransfer from './pages/NewTransfer/NewTransfer'
import { useEffect } from 'react'

export default function App() {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(localStorage.getItem("token") === null && location.pathname !== '/cadastro'){
      navigate("/")
    } else if (localStorage.getItem("token") && location.pathname !== '/cadastro'){
      navigate("/home")
    }
  }, [])

  return (
    <UserProvider>
    <GlobalStyle />
      <Routes>
          <Route path="/cadastro" element={<SignUp />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<MainScreen />}/>
          <Route path="/nova-transacao/:tipo" element={<NewTransfer />}/>
      </Routes>
    </UserProvider>
  )
}
