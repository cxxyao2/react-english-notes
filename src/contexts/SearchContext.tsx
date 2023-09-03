import { useState, createContext, useContext, ReactNode } from 'react'

interface SearchContextType {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  searchKey: string
  setSearchKey: React.Dispatch<React.SetStateAction<string>>
}

interface SearchContextProviderProps {
  children: ReactNode
}

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
)

export function useSearch() {
  return useContext(SearchContext)
}

export function SearchContextProvider({
  children
}: SearchContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState<string>('')

  const value = {
    isLoading,
    setIsLoading,
    searchKey,
    setSearchKey
  }
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
