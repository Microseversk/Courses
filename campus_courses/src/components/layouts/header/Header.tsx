import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useLogoutUserMutation} from "../../../store/api/accountApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {setAuth} from "../../../store/auth.slice";

export function Header() {

    const [logoutUser] = useLogoutUserMutation()
    const isAuth = useTypedSelector(state => state.auth.isAuth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(setAuth(false))
        logoutUser('')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Navbar expand={"lg"} className={'bg-body-tertiary mb-4'}>
            <Container fluid className={"ms-4 me-4"}>
                <Navbar.Brand>Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className={'text-end justify-content-end'}>
                    <Nav>
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