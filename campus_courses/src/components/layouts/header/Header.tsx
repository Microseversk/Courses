import { MDBContainer, MDBIcon, MDBNavbar, MDBNavbarLink, MDBNavbarToggler } from 'mdb-react-ui-kit'
import { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useLogoutUserMutation } from '../../../store/api/accountApi'
import { setAuth, setUser } from '../../../store/slices/auth.slice'
import { AppDispatch } from '../../../store/store'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const [logoutUser] = useLogoutUserMutation()
	const { user, isAuth } = useTypedSelector(state => state.auth)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(setAuth(false))
		dispatch(setUser(null))
		logoutUser('')
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<MDBNavbar expand={'lg'} className={'mb-4'}>
			<MDBContainer fluid className={'ms-4 me-4'}>
				<Link to={'/'} className={'navbar-brand'}>
					<img src={'/images/logo.svg'} width='35' height='35' alt='logo' /> Кампусные курсы
				</Link>
				<MDBNavbarToggler onClick={() => setIsOpen(!isOpen)}>
					<MDBIcon icon='bars' fas />
				</MDBNavbarToggler>

				<Navbar.Collapse in={isOpen}>
					<div className={'ms-lg-4 d-flex flex-column flex-lg-row gap-lg-3'}>
						{isAuth && (
							<Link to={'/groups'} onClick={() => setIsOpen(false)} className={'nav-link'}>
								Группы курсов
							</Link>
						)}
						{isAuth && user?.roles.isStudent && (
							<Link to={'/courses/my'} onClick={() => setIsOpen(false)} className={'nav-link'}>
								Мои курсы
							</Link>
						)}
						{isAuth && user?.roles.isTeacher && (
							<Link to={'/courses/teaching'} onClick={() => setIsOpen(false)} className={'nav-link'}>
								Преподаваемые курсы
							</Link>
						)}
					</div>
					<div className={'d-flex flex-column flex-lg-row gap-lg-3 ms-auto mt-3 mt-lg-0'}>
						{isAuth ? (
							<>
								<Link className={'nav-link'} onClick={() => setIsOpen(false)} to={'/profile'}>
									Профиль
								</Link>
								<MDBNavbarLink className={'nav-link text-start'} onClick={handleLogout}>
									Выйти
								</MDBNavbarLink>
							</>
						) : (
							<>
								<Link className={'nav-link'} onClick={() => setIsOpen(false)} to={'/registration'}>
									Зарегистрироваться
								</Link>
								<Link className={'nav-link'} onClick={() => setIsOpen(false)} to={'/login'}>
									Войти
								</Link>
							</>
						)}
					</div>
				</Navbar.Collapse>
			</MDBContainer>
		</MDBNavbar>
	)
}
