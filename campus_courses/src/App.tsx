import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css'
import { Router } from './components/router/Router'
import { store } from './store/store'

export default function App() {
	return (
		<Provider store={store}>
			<Toaster position='top-center' toastOptions={{ duration: 1000 }} />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</Provider>
	)
}
