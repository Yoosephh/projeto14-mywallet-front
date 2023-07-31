import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import GlobalStyle from './assets/globalstyle'
import UserProvider from './contexts/UserContext'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import MainScreen from './pages/MainScreen/MainScreen'
import NewTransfer from './pages/NewTransfer/NewTransfer'

export default function App() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  function goToInitialPage() {
    if (localStorage.getItem("token")) {
      navigate("/home")
      return
    }
    navigate("/")
  }

  useEffect(() => {
    if (pathname !== '/cadastro') {
      goToInitialPage()
    }
  }, [pathname])

  return (
    <UserProvider>
    <GlobalStyle />
      <Routes>
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<MainScreen />} />
          <Route path="/nova-transacao/:tipo" element={<NewTransfer />} />
      </Routes>
    </UserProvider>
  )
}
