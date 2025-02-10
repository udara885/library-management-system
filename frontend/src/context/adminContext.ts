import { createContext, Dispatch, SetStateAction } from "react"

type AdminContextType = {
  isAdmin: boolean
  setIsAdmin: Dispatch<SetStateAction<boolean>>
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined)