import { createContext, Dispatch, SetStateAction } from "react"

type SidebarContextType = {
  isSidebarOpen: boolean
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)