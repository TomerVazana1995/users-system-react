import React, { createContext, useState, useContext, ReactNode } from 'react';
import {User} from './types'

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  }
  
const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if(!context){
    throw new Error('useUser must be used within a UserProvider')
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: null,
    fullName: '',
    email: '',
    password: '',
    role: ''
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}