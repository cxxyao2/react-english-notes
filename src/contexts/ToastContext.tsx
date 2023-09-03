import React, { createContext, ReactNode,  useState } from 'react'


type ToastContextValue = {
	data: string
	setData: (newData: string) => void
}

// Create the context
export const ToastContext = createContext<ToastContextValue>({} as ToastContextValue)

// Define a custom provider component
type ToastContextProviderProps = {
	children: ReactNode
}

export const ToastContextProvider: React.FC<ToastContextProviderProps> = ({
	children
}) => {
	// Define your context value state
	const [data, setData] = useState<string>('')

	// Define your context value
	const contextValue: ToastContextValue = {
		data,
		setData
	}

	return (
		<ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
	)
}
