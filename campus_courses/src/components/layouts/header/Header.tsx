import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Header() {

    return (
        <Navbar expand={"lg"} className={'bg-body-tertiary'}>
            <Container fluid className={"ms-4 me-4"}>
                <Navbar.Brand>Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className={'text-end justify-content-end'}>
                    <Nav>
                        <Link className={'nav-link'} to={'/registration'}>Зарегистрироваться</Link>
                        <Link className={'nav-link'} to={'/login'}>Войти</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}