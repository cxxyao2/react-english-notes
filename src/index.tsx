import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { store } from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

serviceWorkerRegistration.register()
