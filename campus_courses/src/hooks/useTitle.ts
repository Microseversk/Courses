import { useEffect } from 'react'

type Title = string
export function useTitle(title: Title = 'Campus courses') {
	useEffect(() => {
		document.title = title
	}, [title])
}
