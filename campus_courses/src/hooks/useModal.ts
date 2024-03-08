import { useState } from 'react'

export function useModal() {
	const [isShow, setIsShow] = useState(false)

	const onHide = () => {
		setIsShow(false)
	}

	const onShow = () => {
		setIsShow(true)
	}

	return { isShow, onHide, onShow }
}
