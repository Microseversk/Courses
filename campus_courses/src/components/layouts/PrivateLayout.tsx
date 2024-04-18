import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUserProfileQuery, useGetUserRolesQuery } from '../../store/api/accountApi'
import { setAuth, setUser } from '../../store/slices/auth.slice'
import { AppDispatch } from '../../store/store'
import { Header } from './header/Header'
import { Loader } from './loader/Loader'

export interface ILayoutProps {
	children: ReactNode
}

export function PrivateLayout({ children }: ILayoutProps) {
	const dispatch = useDispatch<AppDispatch>()
	const { data: profile, isLoading: isLoadingProfile } = useGetUserProfileQuery('')
	const { data: roles, isLoading: isLoadingRoles } = useGetUserRolesQuery('')

	useEffect(() => {
		if (!isLoadingProfile && !isLoadingRoles && profile && roles) {
			dispatch(setAuth(true))
			dispatch(
				setUser({
					...profile,
					roles,
				})
			)
		}
	}, [profile, roles])

	return (
		<>
			<Header />
			{isLoadingProfile || isLoadingRoles ? <Loader /> : <main className='mb-3'>{children}</main>}
		</>
	)
}
