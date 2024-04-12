import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import App from './App'
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Suspense>
		<App />
	</Suspense>
)
