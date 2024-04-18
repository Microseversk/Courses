import { SpeedInsights } from '@vercel/speed-insights/react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import App from './App'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<>
		<SpeedInsights />
		<Provider store={store}>
			<Toaster position='top-center' toastOptions={{ duration: 1200 }} />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</>
)
