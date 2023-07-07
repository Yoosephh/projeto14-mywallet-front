import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider( {children} ) {
  const localUser = JSON.parse(localStorage.getItem("token"))
  const [user, setUser] = useState(localUser)
  const navigate = useNavigate();

  useEffect(() => {
    if(!localUser){
      navigate("/")
    } else {
      navigate("/home")
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}