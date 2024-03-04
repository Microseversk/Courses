import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useLogoutUserMutation} from "../../../store/api/accountApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {setAuth, setUser} from "../../../store/auth.slice";
import {IEditProfile} from "../../pages/profilePage/ProfilePage";

export function Header() {

    const [logoutUser] = useLogoutUserMutation()
    const isAuth = useTypedSelector(state => state.auth?.isAuth)
    const user = useTypedSelector(state => state.auth?.user)
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
        <Navbar expand={"lg"} className={'bg-body-tertiary mb-4'}>
            <Container fluid className={"ms-4 me-4"}>
                <Link to={'/'} className={'navbar-brand'}>Кампусные курсы</Link>
                <Navbar.Toggle/>
                <Navbar.Collapse className={''}>
                    <div className={'ms-4 d-flex gap-3'}>
                        {isAuth && <Link to={'/groups'} className={'nav-link'}>Группы курсов</Link>}
                        {isAuth && user?.roles.isStudent  && <Link to={'/courses/my'} className={'nav-link'}>Мои курсы</Link>}
                        {isAuth && user?.roles.isTeacher  && <Link to={'/courses/teaching'} className={'nav-link'}>Преподаваемые курсы</Link>}
                    </div>
                    <Nav className={'ms-auto'}>
                        {isAuth
                            ?
                            <>
                                <Link className={'nav-link'} to={'/profile'}>Профиль</Link>
                                <button className={'nav-link'} onClick={handleLogout}>Выйти</button>
                            </>
                            :
                            <>
                                <Link className={'nav-link'} to={'/registration'}>Зарегистрироваться</Link>
                                <Link className={'nav-link'} to={'/login'}>Войти</Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}