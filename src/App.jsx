import { useState } from 'react'
import GlobalStyle from './assets/globalstyle'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import MainScreen from './pages/MainScreen/MainScreen'
import NewTransfer from './pages/NewTransfer/NewTransfer'

export default function App() {


  return (
    <>
    <GlobalStyle />
      <UserContext.Provider value={{}}>
      <Routes>
          <Route path="/cadastro" element={<SignUp />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<MainScreen />}/>
          <Route path="/nova-transacao/:tipo" element={<NewTransfer />}/>
      </Routes>
      </UserContext.Provider>
    </>
  )
}