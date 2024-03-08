import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	useGetUserProfileQuery,
	useGetUserRolesQuery,
} from '../../store/api/accountApi'
import { setAuth, setUser } from '../../store/slices/auth.slice'
import { AppDispatch } from '../../store/store'
import { Header } from './header/Header'

export interface ILayoutProps {
	children: ReactNode
}

export function PrivateLayout({ children }: ILayoutProps) {
	const navigation = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const {
		data: profile,
		isLoading: isLoadingProfile,
		error: profileError,
	} = useGetUserProfileQuery('')
	const {
		data: roles,
		isLoading: isLoadingRoles,
		error: rolesError,
	} = useGetUserRolesQuery('')

	useEffect(() => {
		if (!isLoadingProfile && !isLoadingRoles && profile && roles) {
			console.log('Вставка человека')
			dispatch(setAuth(true))
			dispatch(
				setUser({
					...profile,
					roles,
				})
			)
		}

		if (profileError || rolesError) {
			console.log('Ошибка фетча')
			localStorage.removeItem('token')
			navigation('/login')
		}
	}, [profile, roles, profileError, rolesError])

	if (isLoadingProfile || isLoadingRoles) {
		return <></>
	}

	return (
		<>
			<Header />
			{children}
		</>
	)
}
