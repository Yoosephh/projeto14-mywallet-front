import { createContext, useContext,  useState } from "react";


export const UserContext = createContext();

export function useToken(){
  return (
    useContext(UserContext)
  )
}
export default function UserProvider( {children} ) {
  const localUser = JSON.parse(localStorage.getItem("token"))
  const [user, setUser] = useState(localUser)


  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}